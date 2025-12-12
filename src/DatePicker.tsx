/**
 * DatePicker.tsx
 * Popover 기반 날짜 선택 컴포넌트
 *
 * @license MIT
 * @copyright 2025 김영진 (Kim Young Jin)
 * @author 김영진 (ehfuse@gmail.com)
 */

import { useState, useEffect } from "react";
import { Popover, PopoverProps } from "@mui/material";
import { SimpleCalendar } from "./SimpleCalendar";
import { DatePickerProps, AnchorElType } from "./types";
import { defaultLocale } from "./locale";

// anchorEl이 RefObject인지 확인하고 실제 엘리먼트 반환
function resolveAnchorEl(
    anchorEl: AnchorElType | undefined
): PopoverProps["anchorEl"] {
    if (!anchorEl) return null;
    // RefObject인 경우 current 반환
    if (typeof anchorEl === "object" && "current" in anchorEl) {
        return anchorEl.current;
    }
    return anchorEl;
}

/**
 * DatePicker - Popover 기반 날짜 선택 컴포넌트
 *
 * 날짜만 선택할 때 사용합니다.
 * 시간 선택이 필요하면 DateTimePicker를 사용하세요.
 */
export function DatePicker({
    open,
    onClose,
    anchorEl,
    selectedDate,
    onDateChange,
    minDate,
    maxDate,
    holidays = [],
    styles,
    showToday = true,
    showFooter = true,
    autoApply = false,
    anchorOrigin = { vertical: "bottom", horizontal: "left" },
    transformOrigin = { vertical: "top", horizontal: "left" },
    slotProps,
    // 로케일 관련
    locale = defaultLocale,
    texts,
    // 년월만 선택
    monthOnly = false,
    // 년도만 선택
    yearOnly = false,
    // 년월/년도 변경 콜백
    onMonthChange,
    onYearChange,
    onWeekChange,
    ...popoverProps
}: DatePickerProps) {
    // anchorEl 해석
    const resolvedAnchorEl = resolveAnchorEl(anchorEl);

    // 내부 임시 날짜 상태
    const [tempDate, setTempDate] = useState<Date | null>(selectedDate ?? null);

    // open될 때 외부 값으로 초기화
    useEffect(() => {
        if (open) {
            setTempDate(selectedDate ?? null);
        }
    }, [open, selectedDate]);

    // 날짜 선택 핸들러 (SimpleCalendar에서 호출)
    const handleDateSelect = (date: Date) => {
        setTempDate(date);
        onDateChange?.(date);
        // autoApply가 true면 날짜 선택 시 바로 닫기
        if (autoApply) {
            onClose();
        }
    };

    return (
        <Popover
            open={open}
            anchorEl={resolvedAnchorEl}
            onClose={onClose}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
            {...popoverProps}
            slotProps={{
                ...slotProps,
                paper: {
                    ...slotProps?.paper,
                    sx: {
                        mt: 1,
                        borderRadius: 2,
                        boxShadow: 3,
                        width: 300,
                        height: showFooter ? 380 : 332,
                        overflow: "hidden",
                        userSelect: "none",
                        ...(slotProps?.paper as any)?.sx,
                    },
                },
            }}
        >
            <SimpleCalendar
                selectedDate={tempDate}
                onSelect={handleDateSelect}
                onClose={onClose}
                minDate={minDate}
                maxDate={maxDate}
                holidays={holidays}
                styles={styles}
                showToday={showToday}
                showFooter={showFooter}
                autoApply={autoApply}
                showTimePicker={false}
                locale={locale}
                texts={texts}
                monthOnly={monthOnly}
                yearOnly={yearOnly}
                onMonthChange={onMonthChange}
                onYearChange={onYearChange}
                onWeekChange={onWeekChange}
            />
        </Popover>
    );
}
