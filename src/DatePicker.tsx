/**
 * DatePicker.tsx
 * Popover 기반 날짜 선택 컴포넌트
 *
 * @license MIT
 * @copyright 2025 김영진 (Kim Young Jin)
 * @author 김영진 (ehfuse@gmail.com)
 */

import { useState, useEffect } from "react";
import { Popover } from "@mui/material";
import type { PopoverProps } from "@mui/material/Popover";
import type { SxProps, Theme } from "@mui/material/styles";
import { SimpleCalendar } from "./SimpleCalendar";
import type { DatePickerProps, AnchorElType } from "./types";
import { defaultLocale } from "./locale";

// anchorEl이 RefObject인지 확인하고 실제 엘리먼트 반환
function resolveAnchorEl(
    anchorEl: AnchorElType | undefined,
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
    const mergedPaperProps = {
        ...slotProps?.paper,
        "data-custom-date-picker-popper": "true",
        tabIndex: -1,
        sx: {
            mt: 1,
            borderRadius: 2,
            boxShadow: 3,
            width: 300,
            height: showFooter ? 380 : 332,
            overflow: "hidden",
            userSelect: "none",
            ...((slotProps?.paper as { sx?: SxProps<Theme> })?.sx ?? {}),
        },
    } as unknown as NonNullable<PopoverProps["slotProps"]>["paper"];

    // anchorEl 해석
    const resolvedAnchorEl = resolveAnchorEl(anchorEl);

    // 내부 임시 날짜 상태
    const [tempDate, setTempDate] = useState<Date | null>(selectedDate ?? null);

    // 이전에 선택된 날짜의 년/월 추적 (이벤트 발생 여부 판단용)
    const prevYear = selectedDate?.getFullYear();
    const prevMonth = selectedDate?.getMonth();

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

        // monthOnly/yearOnly가 아닐 때만 여기서 년/월 변경 콜백 발생
        // monthOnly/yearOnly일 때는 SimpleCalendar에서 이벤트 처리
        if (!monthOnly && !yearOnly) {
            const newYear = date.getFullYear();
            const newMonth = date.getMonth();
            if (prevYear !== newYear) {
                onYearChange?.(newYear);
            }
            if (prevYear !== newYear || prevMonth !== newMonth) {
                onMonthChange?.(newYear, newMonth + 1);
            }
        }

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
                paper: mergedPaperProps,
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
                // monthOnly/yearOnly 모드일 때만 SimpleCalendar의 이벤트를 전달
                // 일반 모드에서는 날짜 선택 시에만 년/월 이벤트 발생
                onYearChange={monthOnly || yearOnly ? onYearChange : undefined}
                onMonthChange={
                    monthOnly || yearOnly ? onMonthChange : undefined
                }
                onWeekChange={onWeekChange}
            />
        </Popover>
    );
}
