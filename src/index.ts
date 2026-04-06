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
    DateTimePickerMode,
    CalendarStyles,
    SimpleCalendarProps,
    TimePickerProps,
    TimeSelectorProps,
    DatePickerProps,
    DateTimePickerProps,
    CalendarTexts,
    LocaleKey,
    LocaleProp,
} from "./types";

// Utils
export type { WeekInfo } from "./utils";
export {
    getWeekInfo,
    isSameDay,
    isSameWeek,
    resolveFooterAndAutoApply,
} from "./utils";

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
export { DatePicker } from "./DatePicker";
export { DateTimePicker } from "./DateTimePicker";

// Backward compatibility aliases (deprecated)
/** @deprecated Use DatePicker or DateTimePicker instead */
export { DatePicker as PopupCalendar } from "./DatePicker";
/** @deprecated DateTimePickerMode는 더 이상 사용되지 않습니다. DatePicker 또는 DateTimePicker를 직접 사용하세요. */
export type { DateTimePickerMode as PopupCalendarMode } from "./types";
/** @deprecated Use DatePickerProps instead */
export type { DatePickerProps as PopupCalendarProps } from "./types";
