# API 레퍼런스

## 목차

-   [컴포넌트](#컴포넌트)
    -   [PopupCalendar](#popupcalendar)
    -   [SimpleCalendar](#simplecalendar)
    -   [TimePicker](#timepicker)
    -   [TimeSelector](#timeselector)
-   [타입](#타입)
    -   [PopupCalendarMode](#popupcalendarmode)
    -   [TimeFormat](#timeformat)
    -   [TimeValue](#timevalue)

---

## 컴포넌트

### PopupCalendar

Popover 기반의 통합 날짜/시간 선택 컴포넌트입니다.

```tsx
import { PopupCalendar } from "@ehfuse/mui-popup-calendar";
```

#### Props

| Prop               | 타입                                                      | 기본값           | 필수 | 설명                                    |
| ------------------ | --------------------------------------------------------- | ---------------- | ---- | --------------------------------------- |
| `open`             | `boolean`                                                 | -                | ✓    | 팝업 열림 상태                          |
| `onClose`          | `() => void`                                              | -                | ✓    | 닫기 콜백                               |
| `anchorEl`         | `AnchorElType`                                            | -                | -    | Popover 앵커 엘리먼트 (ref 객체도 가능) |
| `mode`             | [`PopupCalendarMode`](#popupcalendarmode)                 | `"date"`         | -    | 모드 (date, time, datetime)             |
| `selectedDate`     | `Date \| null`                                            | -                | -    | 선택된 날짜                             |
| `onDateChange`     | `(date: Date) => void`                                    | -                | -    | 날짜 변경 콜백                          |
| `timeValue`        | [`TimeValue`](#timevalue)                                 | -                | -    | 시간 값                                 |
| `onTimeChange`     | `(hour: string, minute: string, second?: string) => void` | -                | -    | 시간 변경 콜백                          |
| `minDate`          | `Date`                                                    | -                | -    | 선택 가능한 최소 날짜                   |
| `maxDate`          | `Date`                                                    | -                | -    | 선택 가능한 최대 날짜                   |
| `holidays`         | `Date[]`                                                  | `[]`             | -    | 공휴일 배열                             |
| `selectedColor`    | `string`                                                  | `"primary.main"` | -    | 선택된 날짜 색상                        |
| `showToday`        | `boolean`                                                 | `true`           | -    | 오늘 버튼 표시 여부                     |
| `showFooter`       | `boolean`                                                 | `true`           | -    | 푸터 표시 여부                          |
| `autoApply`        | `boolean`                                                 | `false`          | -    | 선택 즉시 적용 여부                     |
| `timeFormat`       | [`TimeFormat`](#timeformat)                               | `"HH:mm"`        | -    | 시간 포맷                               |
| `minTime`          | `string`                                                  | -                | -    | 선택 가능한 최소 시간                   |
| `maxTime`          | `string`                                                  | -                | -    | 선택 가능한 최대 시간                   |
| `minuteStep`       | `number`                                                  | `1`              | -    | 분 단위 간격                            |
| `secondStep`       | `number`                                                  | `1`              | -    | 초 단위 간격                            |
| `hideDisabledTime` | `boolean`                                                 | `false`          | -    | 선택 불가 시간 숨김 여부                |

> **참고**: PopupCalendar는 MUI `PopoverProps`를 확장합니다. `anchorOrigin`, `transformOrigin`, `slotProps` 등 Popover의 모든 Props를 사용할 수 있습니다.

---

### SimpleCalendar

인라인 캘린더 컴포넌트입니다.

```tsx
import { SimpleCalendar } from "@ehfuse/mui-popup-calendar";
```

#### Props

| Prop               | 타입                                                      | 기본값           | 필수 | 설명                     |
| ------------------ | --------------------------------------------------------- | ---------------- | ---- | ------------------------ |
| `selectedDate`     | `Date \| null`                                            | -                | ✓    | 선택된 날짜              |
| `onSelect`         | `(date: Date) => void`                                    | -                | ✓    | 날짜 선택 콜백           |
| `onClose`          | `() => void`                                              | -                | ✓    | 닫기 콜백                |
| `minDate`          | `Date`                                                    | -                | -    | 선택 가능한 최소 날짜    |
| `maxDate`          | `Date`                                                    | -                | -    | 선택 가능한 최대 날짜    |
| `holidays`         | `Date[]`                                                  | `[]`             | -    | 공휴일 배열              |
| `selectedColor`    | `string`                                                  | `"primary.main"` | -    | 선택된 날짜 색상         |
| `showToday`        | `boolean`                                                 | `true`           | -    | 오늘 버튼 표시 여부      |
| `showFooter`       | `boolean`                                                 | `true`           | -    | 푸터 표시 여부           |
| `autoApply`        | `boolean`                                                 | `false`          | -    | 선택 즉시 적용 여부      |
| `showTimePicker`   | `boolean`                                                 | `false`          | -    | 시간 선택 표시 여부      |
| `timeValue`        | [`TimeValue`](#timevalue)                                 | -                | -    | 시간 값                  |
| `onTimeChange`     | `(hour: number, minute: number, second?: number) => void` | -                | -    | 시간 변경 콜백           |
| `timeFormat`       | [`TimeFormat`](#timeformat)                               | `"HH:mm"`        | -    | 시간 포맷                |
| `minTime`          | `string`                                                  | -                | -    | 선택 가능한 최소 시간    |
| `maxTime`          | `string`                                                  | -                | -    | 선택 가능한 최대 시간    |
| `minuteStep`       | `number`                                                  | `1`              | -    | 분 단위 간격             |
| `secondStep`       | `number`                                                  | `1`              | -    | 초 단위 간격             |
| `hideDisabledTime` | `boolean`                                                 | `false`          | -    | 선택 불가 시간 숨김 여부 |

---

### TimePicker

Popover 기반의 시간 선택 컴포넌트입니다.

```tsx
import { TimePicker } from "@ehfuse/mui-popup-calendar";
```

#### Props

| Prop               | 타입                                                      | 기본값  | 필수 | 설명                     |
| ------------------ | --------------------------------------------------------- | ------- | ---- | ------------------------ |
| `open`             | `boolean`                                                 | -       | ✓    | 팝업 열림 상태           |
| `onClose`          | `() => void`                                              | -       | ✓    | 닫기 콜백                |
| `value`            | [`TimeValue`](#timevalue)                                 | -       | ✓    | 시간 값                  |
| `onChange`         | `(hour: string, minute: string, second?: string) => void` | -       | ✓    | 시간 변경 콜백           |
| `format`           | [`TimeFormat`](#timeformat)                               | -       | ✓    | 시간 포맷                |
| `anchorEl`         | `AnchorElType`                                            | -       | -    | Popover 앵커 엘리먼트    |
| `minTime`          | `string`                                                  | -       | -    | 선택 가능한 최소 시간    |
| `maxTime`          | `string`                                                  | -       | -    | 선택 가능한 최대 시간    |
| `minuteStep`       | `number`                                                  | `1`     | -    | 분 단위 간격             |
| `secondStep`       | `number`                                                  | `1`     | -    | 초 단위 간격             |
| `hideDisabledTime` | `boolean`                                                 | `false` | -    | 선택 불가 시간 숨김 여부 |
| `autoApply`        | `boolean`                                                 | `false` | -    | 선택 즉시 적용 여부      |

---

### TimeSelector

인라인 시간 선택 컴포넌트입니다.

```tsx
import { TimeSelector } from "@ehfuse/mui-popup-calendar";
```

#### Props

| Prop               | 타입                                                      | 기본값  | 필수 | 설명                     |
| ------------------ | --------------------------------------------------------- | ------- | ---- | ------------------------ |
| `value`            | [`TimeValue`](#timevalue)                                 | -       | ✓    | 시간 값                  |
| `onChange`         | `(hour: number, minute: number, second?: number) => void` | -       | ✓    | 시간 변경 콜백           |
| `format`           | [`TimeFormat`](#timeformat)                               | -       | ✓    | 시간 포맷                |
| `minTime`          | `string`                                                  | -       | -    | 선택 가능한 최소 시간    |
| `maxTime`          | `string`                                                  | -       | -    | 선택 가능한 최대 시간    |
| `minuteStep`       | `number`                                                  | `1`     | -    | 분 단위 간격             |
| `secondStep`       | `number`                                                  | `1`     | -    | 초 단위 간격             |
| `showHeader`       | `boolean`                                                 | `true`  | -    | 상단 시간 표시 헤더      |
| `hideDisabledTime` | `boolean`                                                 | `false` | -    | 선택 불가 시간 숨김 여부 |

---

## 타입

### PopupCalendarMode

팝업 캘린더의 모드를 정의합니다.

```tsx
type PopupCalendarMode = "date" | "time" | "datetime";
```

| 값           | 설명                  |
| ------------ | --------------------- |
| `"date"`     | 날짜만 선택           |
| `"time"`     | 시간만 선택           |
| `"datetime"` | 날짜와 시간 모두 선택 |

---

### TimeFormat

시간 포맷을 정의합니다.

```tsx
type TimeFormat = "HH:mm" | "HH:mm:ss" | "hh:mm" | "hh:mm:ss";
```

| 값           | 설명          | 예시     |
| ------------ | ------------- | -------- |
| `"HH:mm"`    | 24시간제      | 14:30    |
| `"HH:mm:ss"` | 24시간제 + 초 | 14:30:45 |
| `"hh:mm"`    | 12시간제      | 02:30    |
| `"hh:mm:ss"` | 12시간제 + 초 | 02:30:45 |

---

### TimeValue

시간 값을 나타내는 인터페이스입니다.

```tsx
interface TimeValue {
    hour: string; // 시 (00-23 또는 01-12)
    minute: string; // 분 (00-59)
    second?: string; // 초 (00-59, 선택적)
}
```

---

## 관련 문서

-   [시작하기](./getting-started.md) - 설치 및 빠른 시작
-   [예제](./example.md) - 다양한 사용 예제
