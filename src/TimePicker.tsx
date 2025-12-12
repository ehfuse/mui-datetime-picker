/**
 * TimePicker.tsx
 *
 * @license MIT
 * @copyright 2025 김영진 (Kim Young Jin)
 * @author 김영진 (ehfuse@gmail.com)
 */

import { useState, useEffect, useMemo } from "react";
import { Box, Popover, Button, PopoverProps } from "@mui/material";
import { TimeSelector } from "./TimeSelector";
import { TimePickerProps, AnchorElType } from "./types";
import { resolveLocale } from "./locale";

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

export function TimePicker({
    anchorEl,
    open,
    onClose,
    value,
    onChange,
    format,
    minTime,
    maxTime,
    minuteStep = 1,
    secondStep = 1,
    hideDisabledTime = false,
    autoApply = false,
    // 로케일 관련
    locale,
    texts,
}: TimePickerProps) {
    const hasSeconds = format === "HH:mm:ss" || format === "hh:mm:ss";

    // 로케일 해석 및 병합 (texts가 있으면 부분 덮어쓰기)
    const resolvedLocale = resolveLocale(locale);
    const mergedLocale = useMemo(
        () => (texts ? { ...resolvedLocale, ...texts } : resolvedLocale),
        [resolvedLocale, texts]
    );

    // anchorEl 해석
    const resolvedAnchorEl = resolveAnchorEl(anchorEl);

    // 임시 선택값 (확인 버튼 누르기 전까지 보관)
    const [tempHour, setTempHour] = useState<number>(0);
    const [tempMinute, setTempMinute] = useState<number>(0);
    const [tempSecond, setTempSecond] = useState<number>(0);

    // value prop 변경 시 임시값 초기화
    useEffect(() => {
        if (open) {
            const h = parseInt(value.hour, 10);
            const m = parseInt(value.minute, 10);
            const s = value.second ? parseInt(value.second, 10) : 0;

            const now = new Date();
            setTempHour(isNaN(h) ? now.getHours() : h);
            setTempMinute(
                isNaN(m)
                    ? Math.floor(now.getMinutes() / minuteStep) * minuteStep
                    : Math.floor(m / minuteStep) * minuteStep
            );
            if (hasSeconds) {
                setTempSecond(
                    isNaN(s)
                        ? Math.floor(now.getSeconds() / secondStep) * secondStep
                        : Math.floor(s / secondStep) * secondStep
                );
            }
        }
    }, [open, value, minuteStep, secondStep, hasSeconds]);

    // TimeSelector에서 선택 변경 시
    const handleTimeChange = (
        hour: number,
        minute: number,
        second?: number
    ) => {
        setTempHour(hour);
        setTempMinute(minute);
        if (second !== undefined) {
            setTempSecond(second);
        }

        // autoApply가 true면 바로 적용
        if (autoApply) {
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
                        minWidth: hasSeconds ? 165 : 110,
                        userSelect: "none",
                    },
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: autoApply ? 288 : 336,
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
                    />
                </Box>

                {/* 하단 확인 버튼 - autoApply가 false일 때만 표시 */}
                {!autoApply && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: 48,
                            px: 1.5,
                            borderTop: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Button size="small" onClick={handleConfirm} fullWidth>
                            {mergedLocale.confirm}
                        </Button>
                    </Box>
                )}
            </Box>
        </Popover>
    );
}
