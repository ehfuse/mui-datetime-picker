# API Reference

## Table of Contents

-   [Components](#components)
    -   [PopupCalendar](#popupcalendar)
    -   [SimpleCalendar](#simplecalendar)
    -   [TimePicker](#timepicker)
    -   [TimeSelector](#timeselector)
-   [Types](#types)
    -   [PopupCalendarMode](#popupcalendarmode)
    -   [TimeFormat](#timeformat)
    -   [TimeValue](#timevalue)

---

## Components

### PopupCalendar

A Popover-based integrated date/time picker component.

```tsx
import { PopupCalendar } from "@ehfuse/mui-popup-calendar";
```

#### Props

| Prop               | Type                                                      | Default          | Required | Description                                       |
| ------------------ | --------------------------------------------------------- | ---------------- | -------- | ------------------------------------------------- |
| `open`             | `boolean`                                                 | -                | ✓        | Popup open state                                  |
| `onClose`          | `() => void`                                              | -                | ✓        | Close callback                                    |
| `anchorEl`         | `AnchorElType`                                            | -                | -        | Popover anchor element (ref object also accepted) |
| `mode`             | [`PopupCalendarMode`](#popupcalendarmode)                 | `"date"`         | -        | Mode (date, time, datetime)                       |
| `selectedDate`     | `Date \| null`                                            | -                | -        | Selected date                                     |
| `onDateChange`     | `(date: Date) => void`                                    | -                | -        | Date change callback                              |
| `timeValue`        | [`TimeValue`](#timevalue)                                 | -                | -        | Time value                                        |
| `onTimeChange`     | `(hour: string, minute: string, second?: string) => void` | -                | -        | Time change callback                              |
| `minDate`          | `Date`                                                    | -                | -        | Minimum selectable date                           |
| `maxDate`          | `Date`                                                    | -                | -        | Maximum selectable date                           |
| `holidays`         | `Date[]`                                                  | `[]`             | -        | Holiday array                                     |
| `selectedColor`    | `string`                                                  | `"primary.main"` | -        | Selected date color                               |
| `showToday`        | `boolean`                                                 | `true`           | -        | Show today button                                 |
| `showFooter`       | `boolean`                                                 | `true`           | -        | Show footer                                       |
| `autoApply`        | `boolean`                                                 | `false`          | -        | Apply selection immediately                       |
| `timeFormat`       | [`TimeFormat`](#timeformat)                               | `"HH:mm"`        | -        | Time format                                       |
| `minTime`          | `string`                                                  | -                | -        | Minimum selectable time                           |
| `maxTime`          | `string`                                                  | -                | -        | Maximum selectable time                           |
| `minuteStep`       | `number`                                                  | `1`              | -        | Minute step interval                              |
| `secondStep`       | `number`                                                  | `1`              | -        | Second step interval                              |
| `hideDisabledTime` | `boolean`                                                 | `false`          | -        | Hide disabled time options                        |

> **Note**: PopupCalendar extends MUI `PopoverProps`. You can use all Popover props such as `anchorOrigin`, `transformOrigin`, `slotProps`, etc.

---

### SimpleCalendar

An inline calendar component.

```tsx
import { SimpleCalendar } from "@ehfuse/mui-popup-calendar";
```

#### Props

| Prop               | Type                                                      | Default          | Required | Description                 |
| ------------------ | --------------------------------------------------------- | ---------------- | -------- | --------------------------- |
| `selectedDate`     | `Date \| null`                                            | -                | ✓        | Selected date               |
| `onSelect`         | `(date: Date) => void`                                    | -                | ✓        | Date selection callback     |
| `onClose`          | `() => void`                                              | -                | ✓        | Close callback              |
| `minDate`          | `Date`                                                    | -                | -        | Minimum selectable date     |
| `maxDate`          | `Date`                                                    | -                | -        | Maximum selectable date     |
| `holidays`         | `Date[]`                                                  | `[]`             | -        | Holiday array               |
| `selectedColor`    | `string`                                                  | `"primary.main"` | -        | Selected date color         |
| `showToday`        | `boolean`                                                 | `true`           | -        | Show today button           |
| `showFooter`       | `boolean`                                                 | `true`           | -        | Show footer                 |
| `autoApply`        | `boolean`                                                 | `false`          | -        | Apply selection immediately |
| `showTimePicker`   | `boolean`                                                 | `false`          | -        | Show time picker            |
| `timeValue`        | [`TimeValue`](#timevalue)                                 | -                | -        | Time value                  |
| `onTimeChange`     | `(hour: number, minute: number, second?: number) => void` | -                | -        | Time change callback        |
| `timeFormat`       | [`TimeFormat`](#timeformat)                               | `"HH:mm"`        | -        | Time format                 |
| `minTime`          | `string`                                                  | -                | -        | Minimum selectable time     |
| `maxTime`          | `string`                                                  | -                | -        | Maximum selectable time     |
| `minuteStep`       | `number`                                                  | `1`              | -        | Minute step interval        |
| `secondStep`       | `number`                                                  | `1`              | -        | Second step interval        |
| `hideDisabledTime` | `boolean`                                                 | `false`          | -        | Hide disabled time options  |

---

### TimePicker

A Popover-based time picker component.

```tsx
import { TimePicker } from "@ehfuse/mui-popup-calendar";
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
| `secondStep`       | `number`                                                  | `1`     | -        | Second step interval        |
| `hideDisabledTime` | `boolean`                                                 | `false` | -        | Hide disabled time options  |
| `autoApply`        | `boolean`                                                 | `false` | -        | Apply selection immediately |

---

### TimeSelector

An inline time selector component.

```tsx
import { TimeSelector } from "@ehfuse/mui-popup-calendar";
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
| `secondStep`       | `number`                                                  | `1`     | -        | Second step interval       |
| `showHeader`       | `boolean`                                                 | `true`  | -        | Show time display header   |
| `hideDisabledTime` | `boolean`                                                 | `false` | -        | Hide disabled time options |

---

## Types

### PopupCalendarMode

Defines the mode of the popup calendar.

```tsx
type PopupCalendarMode = "date" | "time" | "datetime";
```

| Value        | Description               |
| ------------ | ------------------------- |
| `"date"`     | Select date only          |
| `"time"`     | Select time only          |
| `"datetime"` | Select both date and time |

---

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

## Related Documents

-   [Getting Started](./getting-started.md) - Installation and quick start
-   [Examples](./example.md) - Various usage examples
