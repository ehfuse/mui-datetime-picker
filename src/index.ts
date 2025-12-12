/**
 * index.ts
 * 라이브러리 엔트리 포인트
 *
 * @license MIT
 * @copyright 2025 김영진 (Kim Young Jin)
 * @author 김영진 (ehfuse@gmail.com)
 */

// Types
export type {
    ViewMode,
    TimeFormat,
    TimeValue,
    AnchorElType,
    PopupCalendarMode,
    SimpleCalendarProps,
    TimePickerProps,
    TimeSelectorProps,
    PopupCalendarProps,
    CalendarLocale,
    CalendarTexts,
    LocaleKey,
    LocaleProp,
} from "./types";

// Locales
export {
    defaultLocale,
    locales,
    resolveLocale,
    koLocale,
    enLocale,
    jaLocale,
    zhCNLocale,
    zhTWLocale,
    esLocale,
    frLocale,
    deLocale,
    ptLocale,
    ruLocale,
    itLocale,
    arLocale,
    hiLocale,
    viLocale,
    thLocale,
    idLocale,
    nlLocale,
    plLocale,
    trLocale,
} from "./locale";

// Components
export { SimpleCalendar } from "./SimpleCalendar";
export { TimePicker } from "./TimePicker";
export { TimeSelector } from "./TimeSelector";
export { PopupCalendar } from "./PopupCalendar";
