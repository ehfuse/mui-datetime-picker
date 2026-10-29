/**
 * WheelTimeSelector.tsx
 * 바퀴(휠) 방식 시간 선택 — [오전/오후] [시] [분] 줄을 굴려 가운데 줄에 멈춘 값을 고른다(휴대폰 터치용).
 *
 * - 값은 목록 방식과 같이 24시간(0~23)으로 주고받고, 보이는 것만 12시간이다.
 * - 각 줄은 CSS scroll-snap 으로 가운데에 딱 맞춰 멈춘다. 멈춘 줄이 곧 고른 값이라 따로 누를 필요가 없다.
 * - ⚠️ touchmove 에 passive:false 리스너를 걸지 않는다 — 앱(WebView)에서 터치 스크롤이 매번 메인 스레드를 기다려
 *   멈칫하다 튄다(업무함 메일 목록에서 실제로 겪었다). 여기는 브라우저 기본 스크롤만 쓰고, React 의 터치·휠 핸들러(passive)만 듣는다.
 *
 * @license MIT
 * @copyright 2025 김영진 (Kim Young Jin)
 * @author 김영진 (ehfuse@gmail.com)
 */

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import type { TimeSelectorProps } from "./types";
import { useCalendarLocale } from "./locale";
import { TOUCH_ITEM_FONT_SIZE } from "./constants";

/** 한 줄 높이 — 손가락으로 집기 좋은 높이(목록 방식 large 항목과 거의 같은 높이). */
export const WHEEL_ITEM_HEIGHT = 44;
/**
 * 보이는 줄 수(가운데 + 위아래 한 줄씩). 홀수여야 가운데 줄이 생긴다.
 * 5 → 3(1.0.27, 업무함 2026-10-20 사용자 지적 "위아래 2행까지는 필요 없다") — 앞뒤 값 하나씩이면 어디쯤인지 알 수 있고, 달력 아래에 붙을 때 창이 너무 길었다.
 */
export const WHEEL_VISIBLE_ROWS = 3;
/** 바퀴의 전체 높이 — 창 크기를 정할 때 바깥에서도 쓴다. */
export const WHEEL_HEIGHT = WHEEL_ITEM_HEIGHT * WHEEL_VISIBLE_ROWS;

/** 스크롤 이벤트가 이만큼 끊기면 멈춘 것으로 본다(scrollend 를 모르는 브라우저용). */
const SETTLE_DELAY_MS = 120;

/** 가운데 줄 위아래 여백 — 첫 줄 · 끝 줄도 가운데까지 굴러오게 한다. */
const EDGE_PAD = WHEEL_ITEM_HEIGHT * Math.floor(WHEEL_VISIBLE_ROWS / 2);

/**
 * 끝없이 도는 줄(loop)은 같은 항목을 이만큼 이어 그리고 가운데 벌에서 시작한다(1.0.26, 업무함 2026-10-20 사용자 지시 "시간은 무한 스크롤").
 * 멈출 때마다 가운데 벌의 같은 자리로 소리 없이 옮겨 놓으므로, 한 번에 이 벌 수의 절반 넘게 굴리지 않는 한 끝에 닿지 않는다.
 */
const LOOP_COPIES = 7;
const LOOP_MID = Math.floor(LOOP_COPIES / 2);

interface WheelItem {
    value: number;
    label: string;
    disabled?: boolean;
}

interface WheelColumnProps {
    items: WheelItem[];
    value: number; // 지금 고른 값(바깥에서 바뀌면 그 줄로 굴러간다)
    onSelect: (value: number) => void; // 사용자가 굴려 멈춘 값
    ariaLabel: string;
    loop?: boolean; // 끝없이 돌기(마지막 다음이 처음) — 시 · 분 줄
}

/** 바퀴 한 줄. */
function WheelColumn({ items, value, onSelect, ariaLabel, loop = false }: WheelColumnProps) {
    const ref = useRef<HTMLDivElement>(null);
    const len = items.length;
    const copies = loop ? LOOP_COPIES : 1;
    const midBase = loop ? LOOP_MID * len : 0;
    /** 그린 줄 번호(row) → 항목 번호. */
    const itemAt = (row: number) => ((row % len) + len) % len;
    const rowCount = len * copies;
    const clampRow = (row: number) => Math.min(rowCount - 1, Math.max(0, row));
    // 가운데에 와 있는 줄(그린 줄 번호) — 굴리는 동안에도 진하게 보이도록 스크롤마다 갱신한다(바뀔 때만 다시 그림).
    const [centerIndex, setCenterIndex] = useState(() =>
        midBase + Math.max(0, items.findIndex((it) => it.value === value)),
    );
    // 사용자가 손댄 뒤에만 멈춘 값을 알린다 — 처음 열 때 값 자리로 옮기는 스크롤까지 "고름" 으로 치면
    // 13:07 처럼 간격에 안 맞는 값이 열기만 해도 13:05 로 바뀐다.
    const touchedRef = useRef(false);
    // 손가락이 닿아 있는 동안은 멈춘 것으로 보지 않는다(잠깐 쉬어도 값이 튀지 않게).
    const fingerDownRef = useRef(false);
    const settleTimerRef = useRef<number | undefined>(undefined);
    const lastEmittedRef = useRef<number>(value);

    /**
     * 값이 있는 줄 번호 — 끝없이 도는 줄은 지금 자리에서 가장 가까운 벌의 그 값으로 간다
     * (오전/오후를 바꿔 시가 12칸 옮겨질 때 멀리 돌아가지 않게).
     */
    const rowOf = (v: number, nearRow?: number) => {
        const item = items.findIndex((it) => it.value === v);
        if (item < 0) return -1;
        if (!loop) return item;
        const base = nearRow === undefined ? midBase : Math.round((nearRow - item) / len) * len;
        return clampRow(base + item);
    };

    // 처음 그릴 때 값 자리로 바로 옮긴다(부드럽게 굴리면 열리면서 줄이 휙 지나간다).
    useLayoutEffect(() => {
        const el = ref.current;
        const idx = rowOf(value);
        if (el && idx >= 0) el.scrollTop = idx * WHEEL_ITEM_HEIGHT;
        // 처음 한 번만
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 바깥에서 값이 바뀌면(범위 밖이라 되돌림 등) 그 줄로 굴러간다. 내가 알린 값이면 이미 그 자리다.
    // 그리기 전에 옮긴다(useLayoutEffect) — 그린 뒤 옮기면 한 장면 동안 옛 자리가 보인다.
    useLayoutEffect(() => {
        lastEmittedRef.current = value;
        const el = ref.current;
        if (!el) return;
        const currentRow = Math.round(el.scrollTop / WHEEL_ITEM_HEIGHT);
        if (items[itemAt(currentRow)]?.value === value) return;
        const idx = rowOf(value, currentRow);
        if (idx < 0) return;
        // 보이는 글자가 같으면(오전/오후를 바꿔 4시 → 16시) 굴리지 않고 그 자리에서 옮긴다(1.1.1, 2026-10-29 사용자 지적 —
        // 12칸을 굴러가 한 바퀴 돌아 다시 4시가 됐다). 줄 모양이 같아 눈에는 그대로 서 있다.
        // 깜빡이지 않게(1.1.2, 사용자 지적): ① 가운데 벌로 바로 간다 — 다른 벌로 갔다가 멈춤 처리가 가운데 벌로 또 옮기지 않게
        // ② 옮기는 동안 글자색 전환을 끈다 — 새 가운데 줄이 회색에서 검정으로 0.15초 바뀌며 깜빡였다.
        if (items[itemAt(currentRow)]?.label === items[itemAt(idx)]?.label) {
            const target = loop ? midBase + itemAt(idx) : idx;
            el.dataset.jump = "1";
            el.scrollTop = target * WHEEL_ITEM_HEIGHT;
            setCenterIndex(target);
            requestAnimationFrame(() => requestAnimationFrame(() => delete el.dataset.jump));
            return;
        }
        // 손대기 전(창이 열리며 값이 채워질 때)은 바로 옮긴다 — 부드럽게 굴리면 열리면서 줄이 휙 지나간다.
        el.scrollTo({
            top: idx * WHEEL_ITEM_HEIGHT,
            behavior: touchedRef.current ? "smooth" : "auto",
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    /** 멈춘 자리의 값을 알린다(같은 값이면 조용히). */
    const settle = () => {
        window.clearTimeout(settleTimerRef.current);
        const el = ref.current;
        if (!el || !touchedRef.current || fingerDownRef.current) return;
        const row = clampRow(Math.round(el.scrollTop / WHEEL_ITEM_HEIGHT));
        // 끝없이 도는 줄은 멈춘 자리를 가운데 벌의 같은 항목으로 소리 없이 옮겨 둔다 — 다음에 어느 쪽으로 굴려도 끝이 멀다.
        if (loop) {
            const midRow = midBase + itemAt(row);
            if (midRow !== row) {
                el.scrollTop = midRow * WHEEL_ITEM_HEIGHT;
                setCenterIndex(midRow);
            }
        }
        const next = items[itemAt(row)]?.value;
        if (next === undefined || next === lastEmittedRef.current) return;
        lastEmittedRef.current = next;
        onSelect(next);
    };
    const settleRef = useRef(settle);
    settleRef.current = settle;

    // scrollend 가 있으면 관성이 끝난 바로 그때 알린다(없으면 아래 시간 대기로).
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const onEnd = () => settleRef.current();
        el.addEventListener("scrollend", onEnd);
        return () => {
            el.removeEventListener("scrollend", onEnd);
            window.clearTimeout(settleTimerRef.current);
        };
    }, []);

    const handleScroll = () => {
        const el = ref.current;
        if (!el) return;
        const idx = clampRow(Math.round(el.scrollTop / WHEEL_ITEM_HEIGHT));
        if (idx !== centerIndex) setCenterIndex(idx);
        window.clearTimeout(settleTimerRef.current);
        settleTimerRef.current = window.setTimeout(
            () => settleRef.current(),
            SETTLE_DELAY_MS,
        );
    };

    const markTouched = () => {
        touchedRef.current = true;
    };

    /** 위아래 줄을 누르면 그 줄로 굴린다(멈추면 값이 된다). */
    const handleItemClick = (idx: number) => {
        markTouched();
        ref.current?.scrollTo({
            top: idx * WHEEL_ITEM_HEIGHT,
            behavior: "smooth",
        });
    };

    return (
        <Box
            ref={ref}
            role="listbox"
            aria-label={ariaLabel}
            onScroll={handleScroll}
            onWheel={markTouched}
            onPointerDown={markTouched}
            onTouchStart={() => {
                markTouched();
                fingerDownRef.current = true;
            }}
            onTouchEnd={() => {
                fingerDownRef.current = false;
                // 손을 뗄 때 관성 없이 이미 멈춰 있으면 scroll 이 더 오지 않으니 여기서 한 번 잰다.
                window.clearTimeout(settleTimerRef.current);
                settleTimerRef.current = window.setTimeout(
                    () => settleRef.current(),
                    SETTLE_DELAY_MS,
                );
            }}
            onTouchCancel={() => {
                fingerDownRef.current = false;
            }}
            sx={{
                flex: 1,
                minWidth: 0,
                height: WHEEL_HEIGHT,
                overflowY: "auto",
                overscrollBehavior: "contain",
                scrollSnapType: "y mandatory",
                // 바퀴에는 스크롤 막대가 필요 없다(가운데 줄이 곧 위치 표시다).
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
                WebkitOverflowScrolling: "touch",
                // 같은 글자 자리로 옮기는 동안(위 값 효과)은 글자색 전환을 끈다 — 깜빡임 방지
                "&[data-jump] .MuiTypography-root": { transition: "none" },
            }}
        >
            <Box sx={{ height: EDGE_PAD }} />
            {Array.from({ length: rowCount }, (_, idx) => {
                const item = items[itemAt(idx)];
                const isCenter = idx === centerIndex;
                return (
                    <Box
                        key={idx}
                        role="option"
                        aria-selected={isCenter}
                        data-value={item.value}
                        onClick={() => handleItemClick(idx)}
                        sx={{
                            height: WHEEL_ITEM_HEIGHT,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            scrollSnapAlign: "center",
                            cursor: "pointer",
                        }}
                    >
                        <Typography
                            component="span"
                            sx={{
                                fontSize: TOUCH_ITEM_FONT_SIZE,
                                fontWeight: isCenter ? 600 : 400,
                                fontVariantNumeric: "tabular-nums",
                                color: item.disabled
                                    ? "text.disabled"
                                    : isCenter
                                      ? "text.primary"
                                      : "text.secondary",
                                transition: "color 0.15s",
                            }}
                        >
                            {item.label}
                        </Typography>
                    </Box>
                );
            })}
            <Box sx={{ height: EDGE_PAD }} />
        </Box>
    );
}

/** "HH:mm(:ss)" 를 초로. */
function toSeconds(text: string | undefined): number | null {
    if (!text) return null;
    const [h, m, s] = text.split(":").map((p) => parseInt(p, 10) || 0);
    return (h ?? 0) * 3600 + (m ?? 0) * 60 + (s ?? 0);
}

/** step 간격 값 중 가장 가까운 것(끝을 넘으면 마지막 값). */
function nearestStep(v: number, step: number): number {
    const last = Math.floor(59 / step) * step;
    return Math.min(last, Math.max(0, Math.round(v / step) * step));
}

/**
 * 바퀴 방식 시간 선택. TimeSelector 의 variant="wheel" 이 이것을 그린다.
 * 사용자가 굴려 멈춘 때에만 onChange 를 부른다 — 열기만 하고 확인하면 원래 값이 그대로 남는다.
 */
export function WheelTimeSelector({
    value,
    onChange,
    format,
    minTime,
    maxTime,
    minuteStep = 5,
    secondStep = 1,
    locale,
    texts,
}: TimeSelectorProps) {
    const hasSeconds = format === "HH:mm:ss" || format === "hh:mm:ss";
    // "hh" 포맷은 값 자체가 1~12 라 오전/오후를 붙일 데가 없다 — 시 줄만 1~12 로 둔다.
    const is12HourValue = format.startsWith("hh");
    const resolvedLocale = useCalendarLocale(locale);
    const merged = { ...resolvedLocale, ...texts };
    const amLabel = merged.am ?? "AM";
    const pmLabel = merged.pm ?? "PM";

    // 보이는 값은 바깥 value 에서 바로 얻는다(제어 컴포넌트) — 창이 열린 뒤에야 바깥이 임시값을 채우므로
    // 처음 값만 받아 두면 엉뚱한 시각(0시 등)에 멈춰 있다. 간격에 안 맞는 분은 가까운 간격 값을 가리켜 보이되
    // 알리지는 않는다(위 설명 — 굴리기 전까지 원래 값을 지킨다).
    const parsedHour = parseInt(value.hour, 10);
    const hour = !isNaN(parsedHour)
        ? parsedHour
        : is12HourValue
          ? new Date().getHours() % 12 || 12
          : new Date().getHours();
    const parsedMinute = parseInt(value.minute, 10);
    const minute = nearestStep(
        isNaN(parsedMinute) ? new Date().getMinutes() : parsedMinute,
        minuteStep,
    );
    const parsedSecond = value.second ? parseInt(value.second, 10) : 0;
    const second = nearestStep(isNaN(parsedSecond) ? 0 : parsedSecond, secondStep);

    const minSec = toSeconds(minTime);
    const maxSec = toSeconds(maxTime);
    const inRange = (h: number, m: number, s = 0) => {
        if (is12HourValue) return true; // 1~12 값은 범위를 24시간으로 견줄 수 없다
        const t = h * 3600 + m * 60 + s;
        if (minSec !== null && t < minSec) return false;
        if (maxSec !== null && t > maxSec) return false;
        return true;
    };

    const minutes = useMemo(
        () => Array.from({ length: Math.ceil(60 / minuteStep) }, (_, i) => i * minuteStep),
        [minuteStep],
    );
    const seconds = useMemo(
        () => Array.from({ length: Math.ceil(60 / secondStep) }, (_, i) => i * secondStep),
        [secondStep],
    );

    /** 고른 값을 범위 안으로 맞춰 알린다 — 범위 밖에서 멈추면 가장 가까운 끝 값으로 되굴린다. */
    const commit = (h: number, m: number, s: number) => {
        if (!inRange(h, m, s)) {
            const t = h * 3600 + m * 60 + s;
            const target = minSec !== null && t < minSec ? minSec : (maxSec ?? t);
            // 끝 값이 간격에 안 맞으면 범위 안쪽 간격 값으로(최소는 올림, 최대는 내림)
            const roundUp = minSec !== null && t < minSec;
            let th = Math.floor(target / 3600);
            let tm = Math.floor((target % 3600) / 60);
            const ts = hasSeconds ? target % 60 : 0;
            const stepped = roundUp
                ? Math.ceil(tm / minuteStep) * minuteStep
                : Math.floor(tm / minuteStep) * minuteStep;
            if (stepped >= 60) {
                th = Math.min(23, th + 1);
                tm = 0;
            } else {
                tm = stepped;
            }
            h = th;
            m = tm;
            s = hasSeconds ? nearestStep(ts, secondStep) : 0;
        }
        onChange(h, m, hasSeconds ? s : undefined);
    };

    const isAm = hour < 12;

    // 시 줄은 24시간을 한 바퀴로 두고 글자만 12시간으로 보인다(1.0.26, 업무함 2026-10-20 사용자 지시 "12시가 넘어가면 오전 · 오후가 바뀌어야") —
    // 11 → 12 로 넘어가면 오후(또는 오전)로, 12 → 11 로 거슬러 가면 다시 바뀐다. 오전/오후 줄은 값이 바뀌면 따라 굴러간다.
    // "hh" 포맷(값이 1~12)은 오전/오후가 없어 1~12 한 바퀴다.
    const hourItems: WheelItem[] = is12HourValue
        ? Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: String(i + 1) }))
        : Array.from({ length: 24 }, (_, h24) => ({
              value: h24,
              label: String(h24 % 12 || 12),
              disabled: !minutes.some((m) => inRange(h24, m)),
          }));
    const minuteItems: WheelItem[] = minutes.map((m) => ({
        value: m,
        label: String(m).padStart(2, "0"),
        disabled: !inRange(hour, m),
    }));
    const secondItems: WheelItem[] = seconds.map((s) => ({
        value: s,
        label: String(s).padStart(2, "0"),
        disabled: !inRange(hour, minute, s),
    }));
    const periodItems: WheelItem[] = [
        { value: 0, label: amLabel },
        { value: 1, label: pmLabel },
    ];

    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                alignItems: "stretch",
                height: WHEEL_HEIGHT,
                px: 2,
                userSelect: "none",
            }}
        >
            {/* 가운데 줄 표시 — 위아래 가는 선(고른 줄) */}
            <Box
                aria-hidden
                sx={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    mx: 2, // 바퀴 줄들과 같은 좌우 여백(px: 2)
                    top: EDGE_PAD,
                    height: WHEEL_ITEM_HEIGHT,
                    borderTop: "1px solid",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    pointerEvents: "none",
                }}
            />
            {/* 위아래 끝은 흐리게 — 글자 색만 바꾸면 굴리는 동안 끝이 뚝 끊겨 보인다. */}
            <Box
                sx={{
                    display: "flex",
                    flex: 1,
                    minWidth: 0,
                    WebkitMaskImage:
                        "linear-gradient(to bottom, rgba(0,0,0,0.35) 0, #000 33%, #000 67%, rgba(0,0,0,0.35) 100%)",
                    maskImage:
                        "linear-gradient(to bottom, rgba(0,0,0,0.35) 0, #000 33%, #000 67%, rgba(0,0,0,0.35) 100%)",
                }}
            >
                {!is12HourValue && (
                    <WheelColumn
                        ariaLabel="am-pm"
                        items={periodItems}
                        value={isAm ? 0 : 1}
                        onSelect={(p) => commit((hour % 12) + (p === 1 ? 12 : 0), minute, second)}
                    />
                )}
                <WheelColumn
                    ariaLabel="hour"
                    loop
                    items={hourItems}
                    value={hour}
                    onSelect={(h) => commit(h, minute, second)}
                />
                <WheelColumn
                    ariaLabel="minute"
                    loop
                    items={minuteItems}
                    value={minute}
                    onSelect={(m) => commit(hour, m, second)}
                />
                {hasSeconds && (
                    <WheelColumn
                        ariaLabel="second"
                        items={secondItems}
                        value={second}
                        onSelect={(s) => commit(hour, minute, s)}
                    />
                )}
            </Box>
        </Box>
    );
}
