/**
 * TimePicker.tsx
 *
 * @license MIT
 * @copyright 2025 김영진 (Kim Young Jin)
 * @author 김영진 (ehfuse@gmail.com)
 */

import { useState, useEffect, useMemo, useRef } from "react";
import { Box, Popover, Button, Dialog } from "@mui/material";
import type { PopoverProps } from "@mui/material/Popover";
import { TimeSelector } from "./TimeSelector";
import type { TimePickerProps, AnchorElType } from "./types";
import { useCalendarLocale } from "./locale";

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

export function TimePicker({
    anchorEl,
    open,
    onClose,
    value,
    onChange,
    format,
    minTime,
    maxTime,
    minuteStep: minuteStepProp,
    secondStep = 1,
    hideDisabledTime = false,
    autoApply = false,
    centered = false,
    timeVariant = "list",
    // 로케일 관련
    locale,
    texts,
}: TimePickerProps) {
    const hasSeconds = format === "HH:mm:ss" || format === "hh:mm:ss";
    const isWheel = timeVariant === "wheel";
    // 바퀴는 1분 간격이면 60줄을 굴려야 해 5분이 기본이다(목록 방식은 예전대로 1).
    const minuteStep = minuteStepProp ?? (isWheel ? 5 : 1);

    // 로케일 해석 및 병합 (texts가 있으면 부분 덮어쓰기)
    const resolvedLocale = useCalendarLocale(locale);
    const mergedLocale = useMemo(
        () => (texts ? { ...resolvedLocale, ...texts } : resolvedLocale),
        [resolvedLocale, texts],
    );

    // anchorEl 해석
    const resolvedAnchorEl = resolveAnchorEl(anchorEl);

    // 임시 선택값 (확인 버튼 누르기 전까지 보관)
    const [tempHour, setTempHour] = useState<number>(0);
    const [tempMinute, setTempMinute] = useState<number>(0);
    const [tempSecond, setTempSecond] = useState<number>(0);

    // 바퀴: 열린 그 순간에만 값을 받는다. 바깥 칸은 그릴 때마다 value 객체를 새로 만들어 넘기므로
    // 아래 목록 방식처럼 value 를 따라가면 굴려 둔 값이 확인 전에 원래 값으로 되돌아간다.
    // 분은 간격에 맞춰 자르지 않고 그대로 둔다 — 바퀴를 건드리지 않고 확인하면 13:07 이 13:05 로 바뀌지 않게
    // (바퀴는 가까운 13:05 를 가리켜 보이지만, 사용자가 굴리기 전까지는 원래 값을 지킨다).
    const wasOpenRef = useRef(false);
    useEffect(() => {
        if (!isWheel) return;
        if (open && !wasOpenRef.current) {
            const h = parseInt(value.hour, 10);
            const m = parseInt(value.minute, 10);
            const s = value.second ? parseInt(value.second, 10) : 0;
            const now = new Date();
            setTempHour(isNaN(h) ? now.getHours() : h);
            setTempMinute(
                isNaN(m)
                    ? Math.min(
                          Math.round(now.getMinutes() / minuteStep) * minuteStep,
                          Math.floor(59 / minuteStep) * minuteStep,
                      )
                    : m,
            );
            if (hasSeconds) setTempSecond(isNaN(s) ? 0 : s);
        }
        wasOpenRef.current = open;
    }, [isWheel, open, value, minuteStep, hasSeconds]);

    // value prop 변경 시 임시값 초기화
    useEffect(() => {
        if (isWheel) return;
        if (open) {
            const h = parseInt(value.hour, 10);
            const m = parseInt(value.minute, 10);
            const s = value.second ? parseInt(value.second, 10) : 0;

            const now = new Date();
            setTempHour(isNaN(h) ? now.getHours() : h);
            setTempMinute(
                isNaN(m)
                    ? Math.floor(now.getMinutes() / minuteStep) * minuteStep
                    : Math.floor(m / minuteStep) * minuteStep,
            );
            if (hasSeconds) {
                setTempSecond(
                    isNaN(s)
                        ? Math.floor(now.getSeconds() / secondStep) * secondStep
                        : Math.floor(s / secondStep) * secondStep,
                );
            }
        }
    }, [isWheel, open, value, minuteStep, secondStep, hasSeconds]);

    // TimeSelector에서 선택 변경 시
    const handleTimeChange = (
        hour: number,
        minute: number,
        second?: number,
    ) => {
        setTempHour(hour);
        setTempMinute(minute);
        if (second !== undefined) {
            setTempSecond(second);
        }

        // autoApply가 true면 바로 적용 — 바퀴는 멈출 때마다 닫히면 고를 수가 없어 확인 단추로만 적용한다.
        if (autoApply && !isWheel) {
            const h = String(hour).padStart(2, "0");
            const m = String(minute).padStart(2, "0");
            const s = hasSeconds
                ? String(second ?? 0).padStart(2, "0")
                : undefined;
            onChange(h, m, s);
            onClose();
        }
    };

    // 확인 버튼 클릭 시 onChange 호출
    const handleConfirm = () => {
        const h = String(tempHour).padStart(2, "0");
        const m = String(tempMinute).padStart(2, "0");
        const s = hasSeconds ? String(tempSecond).padStart(2, "0") : undefined;
        onChange(h, m, s);
        onClose();
    };

    // 바퀴 본문 — 아래 [취소] [확인] 글자 단추(본보기: 삼성 캘린더). 단추 줄 높이는 목록 방식 centered 푸터(56)와 같다.
    const wheelContent = (
        <Box sx={{ display: "flex", flexDirection: "column", pt: 1 }}>
            <TimeSelector
                variant="wheel"
                value={{
                    hour: String(tempHour).padStart(2, "0"),
                    minute: String(tempMinute).padStart(2, "0"),
                    second: hasSeconds
                        ? String(tempSecond).padStart(2, "0")
                        : undefined,
                }}
                onChange={handleTimeChange}
                format={format}
                minTime={minTime}
                maxTime={maxTime}
                minuteStep={minuteStep}
                secondStep={secondStep}
                locale={locale}
                texts={texts}
            />
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    height: 56,
                    px: 1.5,
                    gap: 1,
                }}
            >
                <Button size="medium" onClick={onClose} sx={{ flex: 1 }}>
                    {mergedLocale.cancel}
                </Button>
                <Button size="medium" onClick={handleConfirm} sx={{ flex: 1 }}>
                    {mergedLocale.confirm}
                </Button>
            </Box>
        </Box>
    );

    // 선택 UI 본문 (Popover/Dialog 공용 — centered 면 큰 사이즈로 렌더)
    const content = isWheel ? wheelContent : (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: centered
                    ? autoApply
                        ? 420
                        : 476
                    : autoApply
                      ? 288
                      : 336,
            }}
        >
            <Box sx={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
                <TimeSelector
                    value={{
                        hour: String(tempHour).padStart(2, "0"),
                        minute: String(tempMinute).padStart(2, "0"),
                        second: hasSeconds
                            ? String(tempSecond).padStart(2, "0")
                            : undefined,
                    }}
                    onChange={handleTimeChange}
                    format={format}
                    minTime={minTime}
                    maxTime={maxTime}
                    minuteStep={minuteStep}
                    secondStep={secondStep}
                    showHeader={true}
                    hideDisabledTime={hideDisabledTime}
                    size={centered ? "large" : "medium"}
                />
            </Box>

            {/* 하단 확인 버튼 - autoApply가 false일 때만 표시 */}
            {!autoApply && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: centered ? 56 : 48,
                        px: 1.5,
                        borderTop: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <Button
                        size={centered ? "medium" : "small"}
                        onClick={handleConfirm}
                        fullWidth
                    >
                        {mergedLocale.confirm}
                    </Button>
                </Box>
            )}
        </Box>
    );

    // centered: 앵커 무시, 화면 중앙 다이얼로그로 크게 표시 (모바일 터치 선택용)
    if (centered) {
        return (
            <Dialog
                open={open}
                onClose={onClose}
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: 3,
                            // 바퀴는 오전/오후 줄이 더 있어 날짜·시간 창(DateTimePicker centered)과 같은 폭을 쓴다.
                            width: isWheel ? 300 : hasSeconds ? 320 : 248,
                            maxWidth: "calc(100vw - 48px)",
                            userSelect: "none",
                        },
                    },
                }}
            >
                {content}
            </Dialog>
        );
    }

    return (
        <Popover
            open={open}
            anchorEl={resolvedAnchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            slotProps={{
                paper: {
                    sx: {
                        mt: 1,
                        borderRadius: 2,
                        boxShadow: 3,
                        minWidth: isWheel ? 300 : hasSeconds ? 165 : 110,
                        userSelect: "none",
                    },
                },
            }}
        >
            {content}
        </Popover>
    );
}
