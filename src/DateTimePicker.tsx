/**
 * DateTimePicker.tsx
 * Popover 기반 날짜 + 시간 선택 컴포넌트
 *
 * @license MIT
 * @copyright 2025 김영진 (Kim Young Jin)
 * @author 김영진 (ehfuse@gmail.com)
 */

import { useState, useEffect, useRef } from "react";
import { Box, Button, Dialog, Divider, Popover } from "@mui/material";
import type { PopoverProps } from "@mui/material/Popover";
import type { SxProps, Theme } from "@mui/material/styles";
import { SimpleCalendar } from "./SimpleCalendar";
import { TimeSelector } from "./TimeSelector";
import type { DateTimePickerProps, TimeValue, AnchorElType } from "./types";
import { defaultLocale, resolveLocale } from "./locale";
import { getWeekInfo, isSameWeek, resolveFooterAndAutoApply } from "./utils";

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
 * DateTimePicker - Popover 기반 날짜 + 시간 선택 컴포넌트
 *
 * 날짜와 시간을 함께 선택할 때 사용합니다.
 * 날짜만 선택하려면 DatePicker를, 시간만 선택하려면 TimePicker를 사용하세요.
 */
export function DateTimePicker({
    open,
    onClose,
    anchorEl,
    centered = false,
    selectedDate,
    onDateChange,
    timeValue,
    onTimeChange,
    minDate,
    maxDate,
    holidays = [],
    styles,
    showToday = true,
    showFooter = true,
    autoApply = true,
    timeFormat = "HH:mm",
    minTime,
    maxTime,
    minuteStep: minuteStepProp,
    secondStep = 1,
    hideDisabledTime = false,
    timeVariant = "list",
    anchorOrigin = { vertical: "bottom", horizontal: "left" },
    transformOrigin = { vertical: "top", horizontal: "left" },
    slotProps,
    // 로케일 관련
    locale = defaultLocale,
    texts,
    // 년월/년도 변경 콜백
    onMonthChange,
    onYearChange,
    onWeekChange,
    ...popoverProps
}: DateTimePickerProps) {
    const { showFooter: footerOn, autoApply: applyImmediate } =
        resolveFooterAndAutoApply(showFooter, autoApply);

    const hasSeconds = timeFormat === "HH:mm:ss" || timeFormat === "hh:mm:ss";
    const isWheel = timeVariant === "wheel";
    // 바퀴는 1분 간격이면 60줄을 굴려야 해 5분이 기본이다(목록 방식은 예전대로 1).
    const minuteStep = minuteStepProp ?? (isWheel ? 5 : 1);

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
                Math.floor(now.getMinutes() / minuteStep) * minuteStep,
            ).padStart(2, "0"),
            second: hasSeconds
                ? String(
                      Math.floor(now.getSeconds() / secondStep) * secondStep,
                  ).padStart(2, "0")
                : undefined,
        };
    });

    // 바퀴: 열린 그 순간에만 바깥 값을 받는다 — 바깥 칸이 그릴 때마다 timeValue 객체를 새로 넘겨,
    // 아래 목록 방식처럼 따라가면 고르는 중인 날짜·시간이 확인 전에 원래 값으로 되돌아간다.
    // 분은 간격에 맞춰 자르지 않는다 — 바퀴를 건드리지 않고 확인하면 원래 값(13:07)을 그대로 돌려준다.
    const wasOpenRef = useRef(false);
    useEffect(() => {
        if (!isWheel) return;
        if (open && !wasOpenRef.current) {
            setTempDate(selectedDate ?? null);
            const h = parseInt(timeValue?.hour ?? "", 10);
            const m = parseInt(timeValue?.minute ?? "", 10);
            const sec = parseInt(timeValue?.second ?? "", 10);
            const now = new Date();
            setTempTime({
                hour: String(isNaN(h) ? now.getHours() : h).padStart(2, "0"),
                minute: String(
                    isNaN(m)
                        ? Math.min(
                              Math.round(now.getMinutes() / minuteStep) * minuteStep,
                              Math.floor(59 / minuteStep) * minuteStep,
                          )
                        : m,
                ).padStart(2, "0"),
                second: hasSeconds
                    ? String(isNaN(sec) ? 0 : sec).padStart(2, "0")
                    : undefined,
            });
        }
        wasOpenRef.current = open;
    }, [isWheel, open, selectedDate, timeValue, minuteStep, hasSeconds]);

    // open될 때 외부 값으로 초기화
    useEffect(() => {
        if (isWheel) return;
        if (open) {
            setTempDate(selectedDate ?? null);
            if (timeValue) {
                setTempTime(timeValue);
            } else {
                const now = new Date();
                setTempTime({
                    hour: String(now.getHours()).padStart(2, "0"),
                    minute: String(
                        Math.floor(now.getMinutes() / minuteStep) * minuteStep,
                    ).padStart(2, "0"),
                    second: hasSeconds
                        ? String(
                              Math.floor(now.getSeconds() / secondStep) *
                                  secondStep,
                          ).padStart(2, "0")
                        : undefined,
                });
            }
        }
    }, [isWheel, open, selectedDate, timeValue, minuteStep, secondStep, hasSeconds]);

    // 이전에 선택된 날짜의 년/월 추적 (이벤트 발생 여부 판단용)
    const prevYear = selectedDate?.getFullYear();
    const prevMonth = selectedDate?.getMonth();

    // 날짜 선택 핸들러 (SimpleCalendar에서 호출)
    const handleDateSelect = (date: Date) => {
        setTempDate(date);
        // 날짜가 선택되면 항상 콜백 호출 (확인 버튼에서도 호출됨)
        onDateChange?.(date);

        // 날짜 선택 시 년/월 변경 콜백 발생 (이전 날짜와 비교)
        const newYear = date.getFullYear();
        const newMonth = date.getMonth();
        if (prevYear !== newYear) {
            onYearChange?.(newYear);
        }
        if (prevYear !== newYear || prevMonth !== newMonth) {
            onMonthChange?.(newYear, newMonth + 1);
        }
    };

    // SimpleCalendar에서 시간 변경
    const handleCalendarTimeChange = (
        hour: number,
        minute: number,
        second?: number,
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

    // 바퀴: 날짜·시간을 확인 단추를 누를 때 한꺼번에 알린다(취소하면 아무것도 안 바뀐다).
    // 날짜를 먼저 알린다 — 받는 칸(mfc DateTimeTextField)은 날짜를 받을 때 그때의 시각을 붙이고,
    // 시간을 받을 때 마지막 날짜를 쓰므로 날짜 → 시간 순서여야 둘 다 새 값이 남는다.
    const handleWheelConfirm = () => {
        if (tempDate) {
            handleDateSelect(tempDate);
            if (onWeekChange && !(selectedDate && isSameWeek(selectedDate, tempDate))) {
                const w = getWeekInfo(tempDate);
                onWeekChange(w.weekOfMonth, w.startDate, w.endDate);
            }
        }
        onTimeChange?.(
            String(tempTime.hour).padStart(2, "0"),
            String(tempTime.minute).padStart(2, "0"),
            hasSeconds ? String(tempTime.second ?? "00").padStart(2, "0") : undefined,
        );
        onClose();
    };

    if (isWheel) {
        const resolvedTexts = { ...resolveLocale(locale), ...texts };
        const wheelBody = (
            <>
                {/* 위: 달력 — 고른 날은 임시로만 쥐고 있다가 확인 때 알린다. */}
                <Box sx={{ height: 332, flexShrink: 0 }}>
                    <SimpleCalendar
                        selectedDate={tempDate}
                        onSelect={setTempDate}
                        onClose={onClose}
                        minDate={minDate}
                        maxDate={maxDate}
                        holidays={holidays}
                        styles={styles}
                        showToday={showToday}
                        showFooter={false}
                        autoApply
                        locale={locale}
                        texts={texts}
                    />
                </Box>
                <Divider />
                {/* 아래: [오전/오후] [시] [분] 바퀴 */}
                <Box sx={{ pt: 1, flexShrink: 0 }}>
                    <TimeSelector
                        variant="wheel"
                        value={tempTime}
                        onChange={(hour, minute, second) =>
                            setTempTime({
                                hour: String(hour).padStart(2, "0"),
                                minute: String(minute).padStart(2, "0"),
                                second:
                                    second !== undefined
                                        ? String(second).padStart(2, "0")
                                        : undefined,
                            })
                        }
                        format={timeFormat}
                        minTime={minTime}
                        maxTime={maxTime}
                        minuteStep={minuteStep}
                        secondStep={secondStep}
                        locale={locale}
                        texts={texts}
                    />
                </Box>
                {/* [취소] [확인] — 단추 줄 높이는 TimePicker 바퀴와 같다. */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        height: 56,
                        px: 1.5,
                        gap: 1,
                        flexShrink: 0,
                    }}
                >
                    <Button size="medium" onClick={onClose} sx={{ flex: 1 }}>
                        {resolvedTexts.cancel}
                    </Button>
                    <Button size="medium" onClick={handleWheelConfirm} sx={{ flex: 1 }}>
                        {resolvedTexts.confirm}
                    </Button>
                </Box>
            </>
        );
        const wheelPaperSx = {
            borderRadius: 3,
            width: 300,
            maxWidth: "calc(100vw - 48px)",
            overflow: "hidden",
            userSelect: "none",
        } as const;
        if (centered) {
            return (
                <Dialog open={open} onClose={onClose} slotProps={{ paper: { sx: wheelPaperSx } }}>
                    {wheelBody}
                </Dialog>
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
                            ...wheelPaperSx,
                            mt: 1,
                            borderRadius: 2,
                            boxShadow: 3,
                            display: "flex",
                            flexDirection: "column",
                        },
                    },
                }}
            >
                {wheelBody}
            </Popover>
        );
    }

    // 팝오버 크기 결정 (datetime 전용)
    const width = 300 + (hasSeconds ? 165 : 110);
    const height = footerOn ? 380 : 332;

    // centered: 앵커 무시, 화면 중앙 다이얼로그로 표시 (모바일 터치 선택용).
    // 좁은 화면에서는 달력 옆 시간 컬럼이 잘리므로, 달력을 위에 두고 시간 선택을 하단에 가로로 배치한다.
    if (centered) {
        const resolvedTexts = { ...resolveLocale(locale), ...texts };
        return (
            <Dialog
                open={open}
                onClose={onClose}
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: 3,
                            width: 300,
                            maxWidth: "calc(100vw - 48px)",
                            overflow: "hidden",
                            userSelect: "none",
                        },
                    },
                }}
            >
                {/* 상단: 달력(시간 컬럼 없이) — 자체 푸터는 끄고 아래 전용 푸터를 쓴다. */}
                <Box sx={{ height: 332, flexShrink: 0 }}>
                    <SimpleCalendar
                        selectedDate={tempDate}
                        onSelect={handleDateSelect}
                        onClose={onClose}
                        minDate={minDate}
                        maxDate={maxDate}
                        holidays={holidays}
                        styles={styles}
                        showToday={showToday}
                        showFooter={false}
                        autoApply
                        locale={locale}
                        texts={texts}
                        onWeekChange={onWeekChange}
                    />
                </Box>
                <Divider />
                {/* 하단: 시간 선택 — 터치하기 좋게 큰 항목(large)으로 가로 배치한다. */}
                <Box sx={{ height: 208, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                    <TimeSelector
                        value={{
                            hour: String(tempTime.hour).padStart(2, "0"),
                            minute: String(tempTime.minute).padStart(2, "0"),
                            second: String(tempTime.second ?? "00").padStart(2, "0"),
                        }}
                        onChange={handleCalendarTimeChange}
                        format={timeFormat}
                        minTime={minTime}
                        maxTime={maxTime}
                        minuteStep={minuteStep}
                        secondStep={secondStep}
                        showHeader={true}
                        hideDisabledTime={hideDisabledTime}
                        size="large"
                    />
                </Box>
                {/* 푸터: 오늘 / 닫기 */}
                {footerOn ? (
                    <>
                        <Divider />
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                px: 1,
                                py: 0.5,
                                flexShrink: 0,
                            }}
                        >
                            <Button size="small" onClick={() => handleDateSelect(new Date())}>
                                {resolvedTexts.today}
                            </Button>
                            <Button size="small" onClick={onClose}>
                                {resolvedTexts.close}
                            </Button>
                        </Box>
                    </>
                ) : null}
            </Dialog>
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
                        userSelect: "none",
                        ...((slotProps?.paper as { sx?: SxProps<Theme> })?.sx ??
                            {}),
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
                showFooter={footerOn}
                autoApply={applyImmediate}
                showTimePicker={true}
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
                // DateTimePicker는 일반 모드만 있으므로 날짜 선택 시에만 년/월 이벤트 발생
                onWeekChange={onWeekChange}
            />
        </Popover>
    );
}
