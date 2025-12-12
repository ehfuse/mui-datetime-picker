/**
 * PopupCalendar.tsx
 * Popover 기반 팝업 캘린더/시간 선택 컴포넌트
 *
 * @license MIT
 * @copyright 2025 김영진 (Kim Young Jin)
 * @author 김영진 (ehfuse@gmail.com)
 */

import { useState, useEffect } from "react";
import { Popover, PopoverProps } from "@mui/material";
import { SimpleCalendar } from "./SimpleCalendar";
import { TimePicker } from "./TimePicker";
import { PopupCalendarProps, TimeValue, AnchorElType } from "./types";
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
 * PopupCalendar - Popover 기반 팝업 캘린더/시간 선택 컴포넌트
 *
 * mode에 따라:
 * - "date": 날짜 선택만
 * - "time": 시간 선택만
 * - "datetime": 날짜 + 시간 선택
 */
export function PopupCalendar({
    open,
    onClose,
    anchorEl,
    mode = "date",
    selectedDate,
    onDateChange,
    timeValue,
    onTimeChange,
    minDate,
    maxDate,
    holidays = [],
    selectedColor = "primary.main",
    showToday = true,
    showFooter = true,
    autoApply = false,
    timeFormat = "HH:mm",
    minTime,
    maxTime,
    minuteStep = 1,
    secondStep = 1,
    hideDisabledTime = false,
    anchorOrigin = { vertical: "bottom", horizontal: "left" },
    transformOrigin = { vertical: "top", horizontal: "left" },
    slotProps,
    // 로케일 관련
    locale = defaultLocale,
    texts,
    ...popoverProps
}: PopupCalendarProps) {
    const hasSeconds = timeFormat === "HH:mm:ss" || timeFormat === "hh:mm:ss";

    // anchorEl 해석
    const resolvedAnchorEl = resolveAnchorEl(anchorEl);

    // 내부 임시 날짜 상태
    const [tempDate, setTempDate] = useState<Date | null>(selectedDate ?? null);

    // 내부 임시 시간 상태
    const [tempTime, setTempTime] = useState<TimeValue>(() => {
        if (timeValue) return timeValue;
        const now = new Date();
        return {
            hour: String(now.getHours()).padStart(2, "0"),
            minute: String(
                Math.floor(now.getMinutes() / minuteStep) * minuteStep
            ).padStart(2, "0"),
            second: hasSeconds
                ? String(
                      Math.floor(now.getSeconds() / secondStep) * secondStep
                  ).padStart(2, "0")
                : undefined,
        };
    });

    // open될 때 외부 값으로 초기화
    useEffect(() => {
        if (open) {
            setTempDate(selectedDate ?? null);
            if (timeValue) {
                setTempTime(timeValue);
            } else {
                const now = new Date();
                setTempTime({
                    hour: String(now.getHours()).padStart(2, "0"),
                    minute: String(
                        Math.floor(now.getMinutes() / minuteStep) * minuteStep
                    ).padStart(2, "0"),
                    second: hasSeconds
                        ? String(
                              Math.floor(now.getSeconds() / secondStep) *
                                  secondStep
                          ).padStart(2, "0")
                        : undefined,
                });
            }
        }
    }, [open, selectedDate, timeValue, minuteStep, secondStep, hasSeconds]);

    // 날짜 선택 핸들러 (SimpleCalendar에서 호출)
    const handleDateSelect = (date: Date) => {
        setTempDate(date);
        // 날짜가 선택되면 항상 콜백 호출 (확인 버튼에서도 호출됨)
        onDateChange?.(date);
    };

    // SimpleCalendar에서 시간 변경
    const handleCalendarTimeChange = (
        hour: number,
        minute: number,
        second?: number
    ) => {
        const newTime = {
            hour: String(hour).padStart(2, "0"),
            minute: String(minute).padStart(2, "0"),
            second:
                second !== undefined
                    ? String(second).padStart(2, "0")
                    : undefined,
        };
        setTempTime(newTime);

        // 시간이 변경되면 항상 콜백 호출 (확인 버튼에서도 호출됨)
        onTimeChange?.(newTime.hour, newTime.minute, newTime.second);
    };

    // 팝오버 크기 결정
    const getPopoverSize = () => {
        switch (mode) {
            case "time":
                return { width: hasSeconds ? 165 : 110, height: 336 };
            case "datetime":
                return {
                    width: 300 + (hasSeconds ? 165 : 110),
                    height: 380,
                };
            case "date":
            default:
                return { width: 300, height: 380 };
        }
    };

    const { width, height } = getPopoverSize();

    // 시간만 선택하는 모드
    if (mode === "time") {
        return (
            <TimePicker
                anchorEl={anchorEl}
                open={open}
                onClose={onClose}
                value={tempTime}
                onChange={(h, m, s) => {
                    onTimeChange?.(h, m, s);
                }}
                format={timeFormat}
                minTime={minTime}
                maxTime={maxTime}
                minuteStep={minuteStep}
                secondStep={secondStep}
                hideDisabledTime={hideDisabledTime}
                autoApply={autoApply}
                locale={locale}
                texts={texts}
            />
        );
    }

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
                        width,
                        height,
                        overflow: "hidden",
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
                selectedColor={selectedColor}
                showToday={showToday}
                showFooter={showFooter}
                autoApply={autoApply}
                showTimePicker={mode === "datetime"}
                timeValue={tempTime}
                onTimeChange={handleCalendarTimeChange}
                timeFormat={timeFormat}
                minTime={minTime}
                maxTime={maxTime}
                minuteStep={minuteStep}
                secondStep={secondStep}
                hideDisabledTime={hideDisabledTime}
                locale={locale}
                texts={texts}
            />
        </Popover>
    );
}
