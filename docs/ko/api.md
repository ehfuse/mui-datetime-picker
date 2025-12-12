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
    -   [LocaleProp](#localeprop)
    -   [CalendarLocale](#calendarlocale)
    -   [CalendarTexts](#calendartexts)
-   [로케일](#로케일)

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
| `locale`           | [`LocaleProp`](#localeprop)                               | `"ko"`           | -    | 로케일 (문자열 또는 객체)               |
| `texts`            | [`CalendarTexts`](#calendartexts)                         | -                | -    | 텍스트 부분 커스터마이징                |

> **참고**: PopupCalendar는 MUI `PopoverProps`를 확장합니다. `anchorOrigin`, `transformOrigin`, `slotProps` 등 Popover의 모든 Props를 사용할 수 있습니다.

---

### SimpleCalendar

인라인 캘린더 컴포넌트입니다.

```tsx
import { SimpleCalendar } from "@ehfuse/mui-popup-calendar";
```

#### Props

| Prop               | 타입                                                      | 기본값           | 필수 | 설명                      |
| ------------------ | --------------------------------------------------------- | ---------------- | ---- | ------------------------- |
| `selectedDate`     | `Date \| null`                                            | -                | ✓    | 선택된 날짜               |
| `onSelect`         | `(date: Date) => void`                                    | -                | ✓    | 날짜 선택 콜백            |
| `onClose`          | `() => void`                                              | -                | ✓    | 닫기 콜백                 |
| `minDate`          | `Date`                                                    | -                | -    | 선택 가능한 최소 날짜     |
| `maxDate`          | `Date`                                                    | -                | -    | 선택 가능한 최대 날짜     |
| `holidays`         | `Date[]`                                                  | `[]`             | -    | 공휴일 배열               |
| `selectedColor`    | `string`                                                  | `"primary.main"` | -    | 선택된 날짜 색상          |
| `showToday`        | `boolean`                                                 | `true`           | -    | 오늘 버튼 표시 여부       |
| `showFooter`       | `boolean`                                                 | `true`           | -    | 푸터 표시 여부            |
| `autoApply`        | `boolean`                                                 | `false`          | -    | 선택 즉시 적용 여부       |
| `showTimePicker`   | `boolean`                                                 | `false`          | -    | 시간 선택 표시 여부       |
| `timeValue`        | [`TimeValue`](#timevalue)                                 | -                | -    | 시간 값                   |
| `onTimeChange`     | `(hour: number, minute: number, second?: number) => void` | -                | -    | 시간 변경 콜백            |
| `timeFormat`       | [`TimeFormat`](#timeformat)                               | `"HH:mm"`        | -    | 시간 포맷                 |
| `minTime`          | `string`                                                  | -                | -    | 선택 가능한 최소 시간     |
| `maxTime`          | `string`                                                  | -                | -    | 선택 가능한 최대 시간     |
| `minuteStep`       | `number`                                                  | `1`              | -    | 분 단위 간격              |
| `secondStep`       | `number`                                                  | `1`              | -    | 초 단위 간격              |
| `hideDisabledTime` | `boolean`                                                 | `false`          | -    | 선택 불가 시간 숨김 여부  |
| `locale`           | [`LocaleProp`](#localeprop)                               | `"ko"`           | -    | 로케일 (문자열 또는 객체) |
| `texts`            | [`CalendarTexts`](#calendartexts)                         | -                | -    | 텍스트 부분 커스터마이징  |

---

### TimePicker

Popover 기반의 시간 선택 컴포넌트입니다.

```tsx
import { TimePicker } from "@ehfuse/mui-popup-calendar";
```

#### Props

| Prop               | 타입                                                      | 기본값  | 필수 | 설명                      |
| ------------------ | --------------------------------------------------------- | ------- | ---- | ------------------------- |
| `open`             | `boolean`                                                 | -       | ✓    | 팝업 열림 상태            |
| `onClose`          | `() => void`                                              | -       | ✓    | 닫기 콜백                 |
| `value`            | [`TimeValue`](#timevalue)                                 | -       | ✓    | 시간 값                   |
| `onChange`         | `(hour: string, minute: string, second?: string) => void` | -       | ✓    | 시간 변경 콜백            |
| `format`           | [`TimeFormat`](#timeformat)                               | -       | ✓    | 시간 포맷                 |
| `anchorEl`         | `AnchorElType`                                            | -       | -    | Popover 앵커 엘리먼트     |
| `minTime`          | `string`                                                  | -       | -    | 선택 가능한 최소 시간     |
| `maxTime`          | `string`                                                  | -       | -    | 선택 가능한 최대 시간     |
| `minuteStep`       | `number`                                                  | `1`     | -    | 분 단위 간격              |
| `secondStep`       | `number`                                                  | `1`     | -    | 초 단위 간격              |
| `hideDisabledTime` | `boolean`                                                 | `false` | -    | 선택 불가 시간 숨김 여부  |
| `autoApply`        | `boolean`                                                 | `false` | -    | 선택 즉시 적용 여부       |
| `locale`           | [`LocaleProp`](#localeprop)                               | `"ko"`  | -    | 로케일 (문자열 또는 객체) |
| `texts`            | [`CalendarTexts`](#calendartexts)                         | -       | -    | 텍스트 부분 커스터마이징  |

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

### LocaleProp

로케일 설정을 위한 타입입니다. 문자열 또는 `CalendarLocale` 객체를 사용할 수 있습니다.

```tsx
type LocaleProp = CalendarLocale | LocaleKey;

// LocaleKey: 'ko' | 'en' | 'ja' | 'zhCN' | 'zhTW' | 'es' | 'fr' | 'de' | 'pt' | 'ru' | 'it' | 'ar' | 'hi' | 'vi' | 'th' | 'id' | 'nl' | 'pl' | 'tr'
```

**예시:**

```tsx
// 문자열로 간단하게
<PopupCalendar locale="en" />
<PopupCalendar locale="ja" />

// 로케일 객체로
import { enLocale } from "@ehfuse/mui-popup-calendar";
<PopupCalendar locale={enLocale} />
```

---

### CalendarLocale

캘린더 텍스트 로케일을 정의하는 인터페이스입니다.

```tsx
interface CalendarLocale {
    weekdays: [string, string, string, string, string, string, string]; // 요일 (일~토)
    months: [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string
    ]; // 월 (1~12월)
    today: string; // 오늘 버튼
    confirm: string; // 확인 버튼
    cancel: string; // 취소 버튼
    close: string; // 닫기 버튼
}
```

---

### CalendarTexts

로케일 텍스트를 부분적으로 커스터마이징할 수 있는 타입입니다.

```tsx
type CalendarTexts = Partial<CalendarLocale>;
```

---

## 로케일

다국어 지원을 위한 내장 로케일입니다.

```tsx
import { koLocale, enLocale, jaLocale, ... } from "@ehfuse/mui-popup-calendar";
```

### 지원 로케일

| 로케일       | 언어          | import                                                    |
| ------------ | ------------- | --------------------------------------------------------- |
| `koLocale`   | 한국어        | `import { koLocale } from "@ehfuse/mui-popup-calendar"`   |
| `enLocale`   | 영어          | `import { enLocale } from "@ehfuse/mui-popup-calendar"`   |
| `jaLocale`   | 일본어        | `import { jaLocale } from "@ehfuse/mui-popup-calendar"`   |
| `zhCNLocale` | 중국어 (간체) | `import { zhCNLocale } from "@ehfuse/mui-popup-calendar"` |
| `zhTWLocale` | 중국어 (번체) | `import { zhTWLocale } from "@ehfuse/mui-popup-calendar"` |
| `esLocale`   | 스페인어      | `import { esLocale } from "@ehfuse/mui-popup-calendar"`   |
| `frLocale`   | 프랑스어      | `import { frLocale } from "@ehfuse/mui-popup-calendar"`   |
| `deLocale`   | 독일어        | `import { deLocale } from "@ehfuse/mui-popup-calendar"`   |
| `ptLocale`   | 포르투갈어    | `import { ptLocale } from "@ehfuse/mui-popup-calendar"`   |
| `ruLocale`   | 러시아어      | `import { ruLocale } from "@ehfuse/mui-popup-calendar"`   |
| `itLocale`   | 이탈리아어    | `import { itLocale } from "@ehfuse/mui-popup-calendar"`   |
| `arLocale`   | 아랍어        | `import { arLocale } from "@ehfuse/mui-popup-calendar"`   |
| `hiLocale`   | 힌디어        | `import { hiLocale } from "@ehfuse/mui-popup-calendar"`   |
| `viLocale`   | 베트남어      | `import { viLocale } from "@ehfuse/mui-popup-calendar"`   |
| `thLocale`   | 태국어        | `import { thLocale } from "@ehfuse/mui-popup-calendar"`   |
| `idLocale`   | 인도네시아어  | `import { idLocale } from "@ehfuse/mui-popup-calendar"`   |
| `nlLocale`   | 네덜란드어    | `import { nlLocale } from "@ehfuse/mui-popup-calendar"`   |
| `plLocale`   | 폴란드어      | `import { plLocale } from "@ehfuse/mui-popup-calendar"`   |
| `trLocale`   | 터키어        | `import { trLocale } from "@ehfuse/mui-popup-calendar"`   |

### 사용 예시

#### 문자열로 간단하게 설정 (권장)

```tsx
// 가장 간단한 방법 - 문자열 키 사용
<PopupCalendar locale="en" ... />
<PopupCalendar locale="ja" ... />
<PopupCalendar locale="ko" ... />
```

#### 로케일 객체 사용

```tsx
import { PopupCalendar, enLocale } from "@ehfuse/mui-popup-calendar";

<PopupCalendar locale={enLocale} ... />
```

#### 일부 텍스트만 변경

```tsx
<PopupCalendar texts={{ today: "오늘로", confirm: "적용" }} ... />
```

#### 로케일 + 일부 텍스트 변경

```tsx
<PopupCalendar locale="en" texts={{ today: "Jump to Today" }} ... />
```

---

## 관련 문서

-   [시작하기](./getting-started.md) - 설치 및 빠른 시작
-   [예제](./example.md) - 다양한 사용 예제
