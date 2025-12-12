# @ehfuse/mui-popup-calendar

MUI 기반의 팝업 캘린더/시간 선택 컴포넌트 라이브러리

## 설치

```bash
npm install @ehfuse/mui-popup-calendar
```

## 컴포넌트

### PopupCalendar

Popover 기반의 통합 날짜/시간 선택 컴포넌트

```tsx
function PopupCalendar(props: PopupCalendarProps): JSX.Element;
```

### SimpleCalendar

인라인 캘린더 컴포넌트

```tsx
function SimpleCalendar(props: SimpleCalendarProps): JSX.Element;
```

### TimePicker

Popover 기반의 시간 선택 컴포넌트

```tsx
function TimePicker(props: TimePickerProps): JSX.Element;
```

### TimeSelector

인라인 시간 선택 컴포넌트

```tsx
function TimeSelector(props: TimeSelectorProps): JSX.Element;
```

## 타입

```tsx
type PopupCalendarMode = "date" | "time" | "datetime";
type TimeFormat = "HH:mm" | "HH:mm:ss" | "hh:mm" | "hh:mm:ss";

interface TimeValue {
    hour: string;
    minute: string;
    second?: string;
}
```

## 문서

-   [시작하기 (한글)](./docs/ko/getting-started.md)
-   [API 레퍼런스 (한글)](./docs/ko/api.md)
-   [예제 (한글)](./docs/ko/example.md)

## 라이선스

MIT © 김영진 (Kim Young Jin)
