# API 레퍼런스

## 목차

-   [컴포넌트](#컴포넌트)
    -   [DatePicker](#datepicker)
    -   [DateTimePicker](#datetimepicker)
    -   [TimePicker](#timepicker)
    -   [SimpleCalendar](#simplecalendar)
    -   [TimeSelector](#timeselector)
-   [타입](#타입)
    -   [TimeFormat](#timeformat)
    -   [TimeValue](#timevalue)
    -   [WeekInfo](#weekinfo)
    -   [CalendarStyles](#calendarstyles)
    -   [LocaleProp](#localeprop)
    -   [CalendarLocale](#calendarlocale)
    -   [CalendarTexts](#calendartexts)
-   [로케일](#로케일)

---

## 컴포넌트

### DatePicker

Popover 기반의 날짜 선택 컴포넌트입니다.

```tsx
import { DatePicker } from "@ehfuse/mui-datetime-picker";
```

#### Props

| Prop            | 타입                                                            | 기본값  | 필수 | 설명                                    |
| --------------- | --------------------------------------------------------------- | ------- | ---- | --------------------------------------- |
| `open`          | `boolean`                                                       | -       | ✓    | 팝업 열림 상태                          |
| `onClose`       | `() => void`                                                    | -       | ✓    | 닫기 콜백                               |
| `anchorEl`      | `AnchorElType`                                                  | -       | -    | Popover 앵커 엘리먼트 (ref 객체도 가능) |
| `selectedDate`  | `Date \| null`                                                  | -       | -    | 선택된 날짜                             |
| `onDateChange`  | `(date: Date) => void`                                          | -       | -    | 날짜 변경 콜백                          |
| `minDate`       | `Date`                                                          | -       | -    | 선택 가능한 최소 날짜                   |
| `maxDate`       | `Date`                                                          | -       | -    | 선택 가능한 최대 날짜                   |
| `holidays`      | `Date[]`                                                        | `[]`    | -    | 공휴일 배열                             |
| `styles`        | [`CalendarStyles`](#calendarstyles)                             | -       | -    | 스타일 옵션                             |
| `showToday`     | `boolean`                                                       | `true`  | -    | 오늘 버튼 표시 여부                     |
| `showFooter`    | `boolean`                                                       | `true`  | -    | 푸터 표시 여부                          |
| `autoApply`     | `boolean`                                                       | `false` | -    | 선택 즉시 적용 여부                     |
| `locale`        | [`LocaleProp`](#localeprop)                                     | `"ko"`  | -    | 로케일 (문자열 또는 객체)               |
| `texts`         | [`CalendarTexts`](#calendartexts)                               | -       | -    | 텍스트 부분 커스터마이징                |
| `monthOnly`     | `boolean`                                                       | `false` | -    | 년월만 선택 모드                        |
| `yearOnly`      | `boolean`                                                       | `false` | -    | 년도만 선택 모드                        |
| `onMonthChange` | `(year: number, month: number) => void`                         | -       | -    | 월 변경 콜백 (확정 시)                  |
| `onYearChange`  | `(year: number) => void`                                        | -       | -    | 년도 변경 콜백 (확정 시)                |
| `onWeekChange`  | `(weekOfMonth: number, startDate: Date, endDate: Date) => void` | -       | -    | 주 변경 콜백 (확정 시)                  |

> **참고**: DatePicker는 MUI `PopoverProps`를 확장합니다. `anchorOrigin`, `transformOrigin`, `slotProps` 등 Popover의 모든 Props를 사용할 수 있습니다.

---

### DateTimePicker

Popover 기반의 날짜 + 시간 선택 컴포넌트입니다.

```tsx
import { DateTimePicker } from "@ehfuse/mui-datetime-picker";
```

#### Props

| Prop               | 타입                                                            | 기본값    | 필수 | 설명                                    |
| ------------------ | --------------------------------------------------------------- | --------- | ---- | --------------------------------------- |
| `open`             | `boolean`                                                       | -         | ✓    | 팝업 열림 상태                          |
| `onClose`          | `() => void`                                                    | -         | ✓    | 닫기 콜백                               |
| `anchorEl`         | `AnchorElType`                                                  | -         | -    | Popover 앵커 엘리먼트 (ref 객체도 가능) |
| `selectedDate`     | `Date \| null`                                                  | -         | -    | 선택된 날짜                             |
| `onDateChange`     | `(date: Date) => void`                                          | -         | -    | 날짜 변경 콜백                          |
| `timeValue`        | [`TimeValue`](#timevalue)                                       | -         | -    | 시간 값                                 |
| `onTimeChange`     | `(hour: string, minute: string, second?: string) => void`       | -         | -    | 시간 변경 콜백                          |
| `minDate`          | `Date`                                                          | -         | -    | 선택 가능한 최소 날짜                   |
| `maxDate`          | `Date`                                                          | -         | -    | 선택 가능한 최대 날짜                   |
| `holidays`         | `Date[]`                                                        | `[]`      | -    | 공휴일 배열                             |
| `styles`           | [`CalendarStyles`](#calendarstyles)                             | -         | -    | 스타일 옵션                             |
| `showToday`        | `boolean`                                                       | `true`    | -    | 오늘 버튼 표시 여부                     |
| `showFooter`       | `boolean`                                                       | `true`    | -    | 푸터 표시 여부                          |
| `autoApply`        | `boolean`                                                       | `false`   | -    | 선택 즉시 적용 여부                     |
| `timeFormat`       | [`TimeFormat`](#timeformat)                                     | `"HH:mm"` | -    | 시간 포맷                               |
| `minTime`          | `string`                                                        | -         | -    | 선택 가능한 최소 시간                   |
| `maxTime`          | `string`                                                        | -         | -    | 선택 가능한 최대 시간                   |
| `minuteStep`       | `number`                                                        | `1`       | -    | 분 단위 간격                            |
| `timeVariant`      | `"list" \| "wheel"`                                           | `"list"`  | -    | 시간 고르는 방식. `"wheel"` 은 달력 아래 [오전/오후][시][분] 바퀴 + 취소/확인(확인 때 날짜·시간을 함께 알림, autoApply 무시). 바퀴의 분 간격 기본 5 |
| `secondStep`       | `number`                                                        | `1`       | -    | 초 단위 간격                            |
| `hideDisabledTime` | `boolean`                                                       | `false`   | -    | 선택 불가 시간 숨김 여부                |
| `locale`           | [`LocaleProp`](#localeprop)                                     | `"ko"`    | -    | 로케일 (문자열 또는 객체)               |
| `texts`            | [`CalendarTexts`](#calendartexts)                               | -         | -    | 텍스트 부분 커스터마이징                |
| `onMonthChange`    | `(year: number, month: number) => void`                         | -         | -    | 월 변경 콜백 (확정 시)                  |
| `onYearChange`     | `(year: number) => void`                                        | -         | -    | 년도 변경 콜백 (확정 시)                |
| `onWeekChange`     | `(weekOfMonth: number, startDate: Date, endDate: Date) => void` | -         | -    | 주 변경 콜백 (확정 시)                  |

> **참고**: DateTimePicker는 MUI `PopoverProps`를 확장합니다. `anchorOrigin`, `transformOrigin`, `slotProps` 등 Popover의 모든 Props를 사용할 수 있습니다.

---

### SimpleCalendar

인라인 캘린더 컴포넌트입니다.

```tsx
import { SimpleCalendar } from "@ehfuse/mui-datetime-picker";
```

#### Props

| Prop               | 타입                                                            | 기본값    | 필수 | 설명                      |
| ------------------ | --------------------------------------------------------------- | --------- | ---- | ------------------------- |
| `selectedDate`     | `Date \| null`                                                  | -         | ✓    | 선택된 날짜               |
| `onSelect`         | `(date: Date) => void`                                          | -         | ✓    | 날짜 선택 콜백            |
| `onClose`          | `() => void`                                                    | -         | ✓    | 닫기 콜백                 |
| `minDate`          | `Date`                                                          | -         | -    | 선택 가능한 최소 날짜     |
| `maxDate`          | `Date`                                                          | -         | -    | 선택 가능한 최대 날짜     |
| `holidays`         | `Date[]`                                                        | `[]`      | -    | 공휴일 배열               |
| `styles`           | [`CalendarStyles`](#calendarstyles)                             | -         | -    | 스타일 옵션               |
| `showToday`        | `boolean`                                                       | `true`    | -    | 오늘 버튼 표시 여부       |
| `showFooter`       | `boolean`                                                       | `true`    | -    | 푸터 표시 여부            |
| `autoApply`        | `boolean`                                                       | `false`   | -    | 선택 즉시 적용 여부       |
| `showTimePicker`   | `boolean`                                                       | `false`   | -    | 시간 선택 표시 여부       |
| `timeValue`        | [`TimeValue`](#timevalue)                                       | -         | -    | 시간 값                   |
| `onTimeChange`     | `(hour: number, minute: number, second?: number) => void`       | -         | -    | 시간 변경 콜백            |
| `timeFormat`       | [`TimeFormat`](#timeformat)                                     | `"HH:mm"` | -    | 시간 포맷                 |
| `minTime`          | `string`                                                        | -         | -    | 선택 가능한 최소 시간     |
| `maxTime`          | `string`                                                        | -         | -    | 선택 가능한 최대 시간     |
| `minuteStep`       | `number`                                                        | `1`       | -    | 분 단위 간격              |
| `secondStep`       | `number`                                                        | `1`       | -    | 초 단위 간격              |
| `hideDisabledTime` | `boolean`                                                       | `false`   | -    | 선택 불가 시간 숨김 여부  |
| `locale`           | [`LocaleProp`](#localeprop)                                     | `"ko"`    | -    | 로케일 (문자열 또는 객체) |
| `texts`            | [`CalendarTexts`](#calendartexts)                               | -         | -    | 텍스트 부분 커스터마이징  |
| `monthOnly`        | `boolean`                                                       | `false`   | -    | 년월만 선택 모드          |
| `yearOnly`         | `boolean`                                                       | `false`   | -    | 년도만 선택 모드          |
| `onMonthChange`    | `(year: number, month: number) => void`                         | -         | -    | 월 변경 콜백 (선택 시)    |
| `onYearChange`     | `(year: number) => void`                                        | -         | -    | 년도 변경 콜백 (선택 시)  |
| `onWeekChange`     | `(weekOfMonth: number, startDate: Date, endDate: Date) => void` | -         | -    | 주 변경 콜백 (확정 시)    |

> **참고**: SimpleCalendar를 인라인으로 사용할 때 `onYearChange`는 년도 선택 시, `onMonthChange`는 월 선택 시 바로 호출됩니다. DatePicker/DateTimePicker에서는 최종 확정 시에만 호출됩니다.

---

### TimePicker

Popover 기반의 시간 선택 컴포넌트입니다.

```tsx
import { TimePicker } from "@ehfuse/mui-datetime-picker";
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
| `timeVariant`      | `"list" \| "wheel"`                                     | `"list"` | -    | 고르는 방식. `"wheel"` 은 [오전/오후][시][분] 바퀴 + 취소/확인(autoApply 무시), 분 간격 기본 5 |
| `secondStep`       | `number`                                                  | `1`     | -    | 초 단위 간격              |
| `hideDisabledTime` | `boolean`                                                 | `false` | -    | 선택 불가 시간 숨김 여부  |
| `autoApply`        | `boolean`                                                 | `false` | -    | 선택 즉시 적용 여부       |
| `locale`           | [`LocaleProp`](#localeprop)                               | `"ko"`  | -    | 로케일 (문자열 또는 객체) |
| `texts`            | [`CalendarTexts`](#calendartexts)                         | -       | -    | 텍스트 부분 커스터마이징  |

---

### TimeSelector

인라인 시간 선택 컴포넌트입니다.

```tsx
import { TimeSelector } from "@ehfuse/mui-datetime-picker";
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
| `variant`          | `"list" \| "wheel"`                                     | `"list"` | -    | 고르는 방식. `"wheel"` 은 굴려 가운데 줄에 멈춘 값이 선택값(사용자가 굴린 뒤에만 onChange) |
| `secondStep`       | `number`                                                  | `1`     | -    | 초 단위 간격             |
| `showHeader`       | `boolean`                                                 | `true`  | -    | 상단 시간 표시 헤더      |
| `hideDisabledTime` | `boolean`                                                 | `false` | -    | 선택 불가 시간 숨김 여부 |

---

## 타입

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

### WeekInfo

주 정보를 나타내는 인터페이스입니다. `onWeekChange` 콜백에서 사용됩니다.

```tsx
import { WeekInfo, getWeekInfo } from "@ehfuse/mui-datetime-picker";

interface WeekInfo {
    weekOfMonth: number; // 해당 월의 몇 번째 주인지 (1-6)
    startDate: Date; // 주의 시작일 (일요일)
    endDate: Date; // 주의 종료일 (토요일)
}

// 유틸리티 함수
const weekInfo = getWeekInfo(new Date()); // WeekInfo 반환
```

---

### CalendarStyles

캘린더 스타일 커스터마이징을 위한 인터페이스입니다.

```tsx
import type { CalendarStyles } from "@ehfuse/mui-datetime-picker";

interface CalendarStyles {
    selectedColor?: string; // 선택된 날짜 배경 색상 (기본값: 'primary.main')
    todayBorderColor?: string; // 오늘 날짜 테두리 색상 (기본값: selectedColor)
    holidayColor?: string; // 공휴일/일요일 텍스트 색상 (기본값: 'error.main')
    saturdayColor?: string; // 토요일 텍스트 색상 (기본값: 'primary.main')
}
```

**예시:**

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
import { enLocale } from "@ehfuse/mui-datetime-picker";
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
import { koLocale, enLocale, jaLocale, ... } from "@ehfuse/mui-datetime-picker";
```

### 지원 로케일

| 로케일       | 언어          | import                                                     |
| ------------ | ------------- | ---------------------------------------------------------- |
| `koLocale`   | 한국어        | `import { koLocale } from "@ehfuse/mui-datetime-picker"`   |
| `enLocale`   | 영어          | `import { enLocale } from "@ehfuse/mui-datetime-picker"`   |
| `jaLocale`   | 일본어        | `import { jaLocale } from "@ehfuse/mui-datetime-picker"`   |
| `zhCNLocale` | 중국어 (간체) | `import { zhCNLocale } from "@ehfuse/mui-datetime-picker"` |
| `zhTWLocale` | 중국어 (번체) | `import { zhTWLocale } from "@ehfuse/mui-datetime-picker"` |
| `esLocale`   | 스페인어      | `import { esLocale } from "@ehfuse/mui-datetime-picker"`   |
| `frLocale`   | 프랑스어      | `import { frLocale } from "@ehfuse/mui-datetime-picker"`   |
| `deLocale`   | 독일어        | `import { deLocale } from "@ehfuse/mui-datetime-picker"`   |
| `ptLocale`   | 포르투갈어    | `import { ptLocale } from "@ehfuse/mui-datetime-picker"`   |
| `ruLocale`   | 러시아어      | `import { ruLocale } from "@ehfuse/mui-datetime-picker"`   |
| `itLocale`   | 이탈리아어    | `import { itLocale } from "@ehfuse/mui-datetime-picker"`   |
| `arLocale`   | 아랍어        | `import { arLocale } from "@ehfuse/mui-datetime-picker"`   |
| `hiLocale`   | 힌디어        | `import { hiLocale } from "@ehfuse/mui-datetime-picker"`   |
| `viLocale`   | 베트남어      | `import { viLocale } from "@ehfuse/mui-datetime-picker"`   |
| `thLocale`   | 태국어        | `import { thLocale } from "@ehfuse/mui-datetime-picker"`   |
| `idLocale`   | 인도네시아어  | `import { idLocale } from "@ehfuse/mui-datetime-picker"`   |
| `nlLocale`   | 네덜란드어    | `import { nlLocale } from "@ehfuse/mui-datetime-picker"`   |
| `plLocale`   | 폴란드어      | `import { plLocale } from "@ehfuse/mui-datetime-picker"`   |
| `trLocale`   | 터키어        | `import { trLocale } from "@ehfuse/mui-datetime-picker"`   |

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
import { PopupCalendar, enLocale } from "@ehfuse/mui-datetime-picker";

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
