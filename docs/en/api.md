# API Reference

## Table of Contents

-   [Components](#components)
    -   [DatePicker](#datepicker)
    -   [DateTimePicker](#datetimepicker)
    -   [TimePicker](#timepicker)
    -   [SimpleCalendar](#simplecalendar)
    -   [TimeSelector](#timeselector)
-   [Types](#types)
    -   [TimeFormat](#timeformat)
    -   [TimeValue](#timevalue)
    -   [WeekInfo](#weekinfo)
    -   [CalendarStyles](#calendarstyles)
    -   [LocaleProp](#localeprop)
    -   [CalendarLocale](#calendarlocale)
    -   [CalendarTexts](#calendartexts)
-   [Locales](#locales)

---

## Components

### DatePicker

A Popover-based date picker component.

```tsx
import { DatePicker } from "@ehfuse/mui-datetime-picker";
```

#### Props

| Prop            | Type                                                            | Default | Required | Description                                       |
| --------------- | --------------------------------------------------------------- | ------- | -------- | ------------------------------------------------- |
| `open`          | `boolean`                                                       | -       | ✓        | Popup open state                                  |
| `onClose`       | `() => void`                                                    | -       | ✓        | Close callback                                    |
| `anchorEl`      | `AnchorElType`                                                  | -       | -        | Popover anchor element (ref object also accepted) |
| `selectedDate`  | `Date \| null`                                                  | -       | -        | Selected date                                     |
| `onDateChange`  | `(date: Date) => void`                                          | -       | -        | Date change callback                              |
| `minDate`       | `Date`                                                          | -       | -        | Minimum selectable date                           |
| `maxDate`       | `Date`                                                          | -       | -        | Maximum selectable date                           |
| `holidays`      | `Date[]`                                                        | `[]`    | -        | Holiday array                                     |
| `styles`        | [`CalendarStyles`](#calendarstyles)                             | -       | -        | Style options                                     |
| `showToday`     | `boolean`                                                       | `true`  | -        | Show today button                                 |
| `showFooter`    | `boolean`                                                       | `true`  | -        | Show footer                                       |
| `autoApply`     | `boolean`                                                       | `false` | -        | Apply selection immediately                       |
| `locale`        | [`LocaleProp`](#localeprop)                                     | `"ko"`  | -        | Locale (string or object)                         |
| `texts`         | [`CalendarTexts`](#calendartexts)                               | -       | -        | Partial text overrides                            |
| `monthOnly`     | `boolean`                                                       | `false` | -        | Month-only selection mode                         |
| `yearOnly`      | `boolean`                                                       | `false` | -        | Year-only selection mode                          |
| `onMonthChange` | `(year: number, month: number) => void`                         | -       | -        | Month change callback (on confirm)                |
| `onYearChange`  | `(year: number) => void`                                        | -       | -        | Year change callback (on confirm)                 |
| `onWeekChange`  | `(weekOfMonth: number, startDate: Date, endDate: Date) => void` | -       | -        | Week change callback (on confirm)                 |

> **Note**: DatePicker extends MUI `PopoverProps`. You can use all Popover props such as `anchorOrigin`, `transformOrigin`, `slotProps`, etc.

---

### DateTimePicker

A Popover-based date and time picker component.

```tsx
import { DateTimePicker } from "@ehfuse/mui-datetime-picker";
```

#### Props

| Prop               | Type                                                            | Default   | Required | Description                                       |
| ------------------ | --------------------------------------------------------------- | --------- | -------- | ------------------------------------------------- |
| `open`             | `boolean`                                                       | -         | ✓        | Popup open state                                  |
| `onClose`          | `() => void`                                                    | -         | ✓        | Close callback                                    |
| `anchorEl`         | `AnchorElType`                                                  | -         | -        | Popover anchor element (ref object also accepted) |
| `selectedDate`     | `Date \| null`                                                  | -         | -        | Selected date                                     |
| `onDateChange`     | `(date: Date) => void`                                          | -         | -        | Date change callback                              |
| `timeValue`        | [`TimeValue`](#timevalue)                                       | -         | -        | Time value                                        |
| `onTimeChange`     | `(hour: string, minute: string, second?: string) => void`       | -         | -        | Time change callback                              |
| `minDate`          | `Date`                                                          | -         | -        | Minimum selectable date                           |
| `maxDate`          | `Date`                                                          | -         | -        | Maximum selectable date                           |
| `holidays`         | `Date[]`                                                        | `[]`      | -        | Holiday array                                     |
| `styles`           | [`CalendarStyles`](#calendarstyles)                             | -         | -        | Style options                                     |
| `showToday`        | `boolean`                                                       | `true`    | -        | Show today button                                 |
| `showFooter`       | `boolean`                                                       | `true`    | -        | Show footer                                       |
| `autoApply`        | `boolean`                                                       | `false`   | -        | Apply selection immediately                       |
| `timeFormat`       | [`TimeFormat`](#timeformat)                                     | `"HH:mm"` | -        | Time format                                       |
| `minTime`          | `string`                                                        | -         | -        | Minimum selectable time                           |
| `maxTime`          | `string`                                                        | -         | -        | Maximum selectable time                           |
| `minuteStep`       | `number`                                                        | `1`       | -        | Minute step interval                              |
| `timeVariant`      | `"list" \| "wheel"`                                           | `"list"`  | -        | Time picking style. `"wheel"` shows [AM/PM][hour][minute] wheels under the calendar with Cancel/OK (date and time are emitted on OK, autoApply ignored). Wheel minute step defaults to 5 |
| `secondStep`       | `number`                                                        | `1`       | -        | Second step interval                              |
| `hideDisabledTime` | `boolean`                                                       | `false`   | -        | Hide disabled time options                        |
| `locale`           | [`LocaleProp`](#localeprop)                                     | `"ko"`    | -        | Locale (string or object)                         |
| `texts`            | [`CalendarTexts`](#calendartexts)                               | -         | -        | Partial text overrides                            |
| `onMonthChange`    | `(year: number, month: number) => void`                         | -         | -        | Month change callback (on confirm)                |
| `onYearChange`     | `(year: number) => void`                                        | -         | -        | Year change callback (on confirm)                 |
| `onWeekChange`     | `(weekOfMonth: number, startDate: Date, endDate: Date) => void` | -         | -        | Week change callback (on confirm)                 |

> **Note**: DateTimePicker extends MUI `PopoverProps`. You can use all Popover props such as `anchorOrigin`, `transformOrigin`, `slotProps`, etc.

---

### SimpleCalendar

An inline calendar component.

```tsx
import { SimpleCalendar } from "@ehfuse/mui-datetime-picker";
```

#### Props

| Prop               | Type                                                            | Default   | Required | Description                       |
| ------------------ | --------------------------------------------------------------- | --------- | -------- | --------------------------------- |
| `selectedDate`     | `Date \| null`                                                  | -         | ✓        | Selected date                     |
| `onSelect`         | `(date: Date) => void`                                          | -         | ✓        | Date selection callback           |
| `onClose`          | `() => void`                                                    | -         | ✓        | Close callback                    |
| `minDate`          | `Date`                                                          | -         | -        | Minimum selectable date           |
| `maxDate`          | `Date`                                                          | -         | -        | Maximum selectable date           |
| `holidays`         | `Date[]`                                                        | `[]`      | -        | Holiday array                     |
| `styles`           | [`CalendarStyles`](#calendarstyles)                             | -         | -        | Style options                     |
| `showToday`        | `boolean`                                                       | `true`    | -        | Show today button                 |
| `showFooter`       | `boolean`                                                       | `true`    | -        | Show footer                       |
| `autoApply`        | `boolean`                                                       | `false`   | -        | Apply selection immediately       |
| `showTimePicker`   | `boolean`                                                       | `false`   | -        | Show time picker                  |
| `timeValue`        | [`TimeValue`](#timevalue)                                       | -         | -        | Time value                        |
| `onTimeChange`     | `(hour: number, minute: number, second?: number) => void`       | -         | -        | Time change callback              |
| `timeFormat`       | [`TimeFormat`](#timeformat)                                     | `"HH:mm"` | -        | Time format                       |
| `minTime`          | `string`                                                        | -         | -        | Minimum selectable time           |
| `maxTime`          | `string`                                                        | -         | -        | Maximum selectable time           |
| `minuteStep`       | `number`                                                        | `1`       | -        | Minute step interval              |
| `secondStep`       | `number`                                                        | `1`       | -        | Second step interval              |
| `hideDisabledTime` | `boolean`                                                       | `false`   | -        | Hide disabled time options        |
| `locale`           | [`LocaleProp`](#localeprop)                                     | `"ko"`    | -        | Locale (string or object)         |
| `texts`            | [`CalendarTexts`](#calendartexts)                               | -         | -        | Partial text overrides            |
| `monthOnly`        | `boolean`                                                       | `false`   | -        | Month-only selection mode         |
| `yearOnly`         | `boolean`                                                       | `false`   | -        | Year-only selection mode          |
| `onMonthChange`    | `(year: number, month: number) => void`                         | -         | -        | Month change callback (on select) |
| `onYearChange`     | `(year: number) => void`                                        | -         | -        | Year change callback (on select)  |
| `onWeekChange`     | `(weekOfMonth: number, startDate: Date, endDate: Date) => void` | -         | -        | Week change callback (on confirm) |

> **Note**: When using SimpleCalendar inline, `onYearChange` is called immediately on year selection, and `onMonthChange` is called immediately on month selection. In DatePicker/DateTimePicker, they are only called on final confirmation.

---

### TimePicker

A Popover-based time picker component.

```tsx
import { TimePicker } from "@ehfuse/mui-datetime-picker";
```

#### Props

| Prop               | Type                                                      | Default | Required | Description                 |
| ------------------ | --------------------------------------------------------- | ------- | -------- | --------------------------- |
| `open`             | `boolean`                                                 | -       | ✓        | Popup open state            |
| `onClose`          | `() => void`                                              | -       | ✓        | Close callback              |
| `value`            | [`TimeValue`](#timevalue)                                 | -       | ✓        | Time value                  |
| `onChange`         | `(hour: string, minute: string, second?: string) => void` | -       | ✓        | Time change callback        |
| `format`           | [`TimeFormat`](#timeformat)                               | -       | ✓        | Time format                 |
| `anchorEl`         | `AnchorElType`                                            | -       | -        | Popover anchor element      |
| `minTime`          | `string`                                                  | -       | -        | Minimum selectable time     |
| `maxTime`          | `string`                                                  | -       | -        | Maximum selectable time     |
| `minuteStep`       | `number`                                                  | `1`     | -        | Minute step interval        |
| `timeVariant`      | `"list" \| "wheel"`                                     | `"list"` | -        | Picking style. `"wheel"` shows [AM/PM][hour][minute] wheels with Cancel/OK (autoApply ignored), minute step defaults to 5 |
| `secondStep`       | `number`                                                  | `1`     | -        | Second step interval        |
| `hideDisabledTime` | `boolean`                                                 | `false` | -        | Hide disabled time options  |
| `autoApply`        | `boolean`                                                 | `false` | -        | Apply selection immediately |
| `locale`           | [`LocaleProp`](#localeprop)                               | `"ko"`  | -        | Locale (string or object)   |
| `texts`            | [`CalendarTexts`](#calendartexts)                         | -       | -        | Partial text overrides      |

---

### TimeSelector

An inline time selector component.

```tsx
import { TimeSelector } from "@ehfuse/mui-datetime-picker";
```

#### Props

| Prop               | Type                                                      | Default | Required | Description                |
| ------------------ | --------------------------------------------------------- | ------- | -------- | -------------------------- |
| `value`            | [`TimeValue`](#timevalue)                                 | -       | ✓        | Time value                 |
| `onChange`         | `(hour: number, minute: number, second?: number) => void` | -       | ✓        | Time change callback       |
| `format`           | [`TimeFormat`](#timeformat)                               | -       | ✓        | Time format                |
| `minTime`          | `string`                                                  | -       | -        | Minimum selectable time    |
| `maxTime`          | `string`                                                  | -       | -        | Maximum selectable time    |
| `minuteStep`       | `number`                                                  | `1`     | -        | Minute step interval       |
| `variant`          | `"list" \| "wheel"`                                     | `"list"` | -        | Picking style. In `"wheel"` the row that snaps to the center is the value (onChange fires only after the user scrolls) |
| `secondStep`       | `number`                                                  | `1`     | -        | Second step interval       |
| `showHeader`       | `boolean`                                                 | `true`  | -        | Show time display header   |
| `hideDisabledTime` | `boolean`                                                 | `false` | -        | Hide disabled time options |

---

## Types

### TimeFormat

Defines the time format.

```tsx
type TimeFormat = "HH:mm" | "HH:mm:ss" | "hh:mm" | "hh:mm:ss";
```

| Value        | Description       | Example  |
| ------------ | ----------------- | -------- |
| `"HH:mm"`    | 24-hour           | 14:30    |
| `"HH:mm:ss"` | 24-hour + seconds | 14:30:45 |
| `"hh:mm"`    | 12-hour           | 02:30    |
| `"hh:mm:ss"` | 12-hour + seconds | 02:30:45 |

---

### TimeValue

Interface representing a time value.

```tsx
interface TimeValue {
    hour: string; // Hour (00-23 or 01-12)
    minute: string; // Minute (00-59)
    second?: string; // Second (00-59, optional)
}
```

---

### WeekInfo

Interface representing week information. Used in `onWeekChange` callback.

```tsx
import { WeekInfo, getWeekInfo } from "@ehfuse/mui-datetime-picker";

interface WeekInfo {
    weekOfMonth: number; // Week number of the month (1-6)
    startDate: Date; // Start of the week (Sunday)
    endDate: Date; // End of the week (Saturday)
}

// Utility function
const weekInfo = getWeekInfo(new Date()); // Returns WeekInfo
```

---

### CalendarStyles

Interface for calendar style customization.

```tsx
import type { CalendarStyles } from "@ehfuse/mui-datetime-picker";

interface CalendarStyles {
    selectedColor?: string; // Selected date background color (default: 'primary.main')
    todayBorderColor?: string; // Today's date border color (default: selectedColor)
    holidayColor?: string; // Holiday/Sunday text color (default: 'error.main')
    saturdayColor?: string; // Saturday text color (default: 'primary.main')
}
```

**Example:**

```tsx
<PopupCalendar
    styles={{
        selectedColor: "secondary.main",
        todayBorderColor: "warning.main",
        holidayColor: "error.dark",
        saturdayColor: "info.main",
    }}
/>
```

---

### LocaleProp

Type for locale settings. You can use a string key or a `CalendarLocale` object.

```tsx
type LocaleProp = CalendarLocale | LocaleKey;

// LocaleKey: 'ko' | 'en' | 'ja' | 'zhCN' | 'zhTW' | 'es' | 'fr' | 'de' | 'pt' | 'ru' | 'it' | 'ar' | 'hi' | 'vi' | 'th' | 'id' | 'nl' | 'pl' | 'tr'
```

**Examples:**

```tsx
// Simple string key
<PopupCalendar locale="en" />
<PopupCalendar locale="ja" />

// Locale object
import { enLocale } from "@ehfuse/mui-datetime-picker";
<PopupCalendar locale={enLocale} />
```

---

### CalendarLocale

Interface representing locale settings. Use to change weekday names, month names, and button texts.

```tsx
interface CalendarLocale {
    weekdays: string[]; // Weekday names (Sun-Sat)
    months: string[]; // Month names (1-12)
    today: string; // Today button text
    confirm: string; // Confirm button text
    cancel: string; // Cancel button text
    close: string; // Close button text
}
```

---

### CalendarTexts

Type for partial text overrides. Use when you only want to change specific texts.

```tsx
type CalendarTexts = Partial<CalendarLocale>;
```

---

## Locales

This library provides built-in locale support for 19 languages.

### Supported Locales

| Code   | Language              | Import Name  | Weekdays Example           | Buttons Example       |
| ------ | --------------------- | ------------ | -------------------------- | --------------------- |
| `ko`   | Korean                | `koLocale`   | 일, 월, 화, 수, 목, 금, 토 | 확인, 취소            |
| `en`   | English               | `enLocale`   | Sun, Mon, Tue, ...         | Confirm, Cancel       |
| `ja`   | Japanese              | `jaLocale`   | 日, 月, 火, 水, 木, 金, 土 | 確認, キャンセル      |
| `zhCN` | Chinese (Simplified)  | `zhCNLocale` | 日, 一, 二, 三, 四, 五, 六 | 确认, 取消            |
| `zhTW` | Chinese (Traditional) | `zhTWLocale` | 日, 一, 二, 三, 四, 五, 六 | 確認, 取消            |
| `es`   | Spanish               | `esLocale`   | Dom, Lun, Mar, ...         | Confirmar, Cancelar   |
| `fr`   | French                | `frLocale`   | Dim, Lun, Mar, ...         | Confirmer, Annuler    |
| `de`   | German                | `deLocale`   | So, Mo, Di, ...            | Bestätigen, Abbrechen |
| `pt`   | Portuguese            | `ptLocale`   | Dom, Seg, Ter, ...         | Confirmar, Cancelar   |
| `ru`   | Russian               | `ruLocale`   | Вс, Пн, Вт, ...            | Подтвердить, Отмена   |
| `it`   | Italian               | `itLocale`   | Dom, Lun, Mar, ...         | Conferma, Annulla     |
| `ar`   | Arabic                | `arLocale`   | أحد, إثنين, ...            | تأكيد, إلغاء          |
| `hi`   | Hindi                 | `hiLocale`   | रवि, सोम, ...              | पुष्टि करें, रद्द     |
| `vi`   | Vietnamese            | `viLocale`   | CN, T2, T3, ...            | Xác nhận, Hủy         |
| `th`   | Thai                  | `thLocale`   | อา, จ, อ, ...              | ยืนยัน, ยกเลิก        |
| `id`   | Indonesian            | `idLocale`   | Min, Sen, Sel, ...         | Konfirmasi, Batal     |
| `nl`   | Dutch                 | `nlLocale`   | Zo, Ma, Di, ...            | Bevestigen, Annuleren |
| `pl`   | Polish                | `plLocale`   | Nd, Pn, Wt, ...            | Potwierdź, Anuluj     |
| `tr`   | Turkish               | `trLocale`   | Paz, Pzt, Sal, ...         | Onayla, İptal         |

### Usage

#### Simple String Key (Recommended)

```tsx
// Simplest way - use string key
<PopupCalendar locale="en" ... />
<PopupCalendar locale="ja" ... />
<PopupCalendar locale="ko" ... />
```

#### Using Locale Object

```tsx
import { PopupCalendar, enLocale, jaLocale } from "@ehfuse/mui-datetime-picker";

<PopupCalendar locale={enLocale} ... />
<PopupCalendar locale={jaLocale} ... />
```

#### Partial Text Overrides

```tsx
// Override only specific texts
<PopupCalendar
    locale="en"
    texts={{
        confirm: "OK",
        cancel: "Back",
    }}
    ...
/>
```

#### Custom Locale

```tsx
// Create fully custom locale
const customLocale: CalendarLocale = {
    weekdays: ["S", "M", "T", "W", "T", "F", "S"],
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    today: "Today",
    confirm: "OK",
    cancel: "Cancel",
    close: "Close",
};

<PopupCalendar locale={customLocale} ... />
```

---

## Related Documents

-   [Getting Started](./getting-started.md) - Installation and quick start
-   [Examples](./example.md) - Various usage examples
