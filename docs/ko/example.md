# 예제

## 목차

-   [기본 사용법](#기본-사용법)
    -   [날짜 선택](#날짜-선택)
    -   [시간 선택](#시간-선택)
    -   [날짜+시간 선택](#날짜시간-선택)
-   [고급 사용법](#고급-사용법)
    -   [날짜 범위 제한](#날짜-범위-제한)
    -   [시간 범위 제한](#시간-범위-제한)
    -   [공휴일 표시](#공휴일-표시)
    -   [autoApply 모드](#autoapply-모드)
    -   [푸터 숨기기](#푸터-숨기기)
    -   [인라인 캘린더](#인라인-캘린더)
    -   [다국어 지원](#다국어-지원)

---

## 기본 사용법

### 날짜 선택

가장 기본적인 날짜 선택 예제입니다.

```tsx
import { useState, useRef } from "react";
import { Button } from "@mui/material";
import { PopupCalendar } from "@ehfuse/mui-popup-calendar";

function DatePickerExample() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    return (
        <>
            <Button
                ref={anchorRef}
                variant="outlined"
                onClick={() => setOpen(true)}
            >
                {selectedDate?.toLocaleDateString("ko-KR") ?? "날짜 선택"}
            </Button>
            <PopupCalendar
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={anchorRef}
                mode="date"
                selectedDate={selectedDate}
                onDateChange={(date) => setSelectedDate(date)}
            />
        </>
    );
}
```

---

### 시간 선택

시간만 선택하는 예제입니다.

```tsx
import { useState, useRef } from "react";
import { Button } from "@mui/material";
import { PopupCalendar } from "@ehfuse/mui-popup-calendar";
import type { TimeValue } from "@ehfuse/mui-popup-calendar";

function TimePickerExample() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [timeValue, setTimeValue] = useState<TimeValue>({
        hour: "09",
        minute: "00",
    });

    return (
        <>
            <Button
                ref={anchorRef}
                variant="outlined"
                onClick={() => setOpen(true)}
            >
                {`${timeValue.hour}:${timeValue.minute}`}
            </Button>
            <PopupCalendar
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={anchorRef}
                mode="time"
                timeValue={timeValue}
                onTimeChange={(hour, minute) => setTimeValue({ hour, minute })}
                timeFormat="HH:mm"
            />
        </>
    );
}
```

---

### 날짜+시간 선택

날짜와 시간을 함께 선택하는 예제입니다.

```tsx
import { useState, useRef } from "react";
import { Button } from "@mui/material";
import { PopupCalendar } from "@ehfuse/mui-popup-calendar";
import type { TimeValue } from "@ehfuse/mui-popup-calendar";

function DateTimePickerExample() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [timeValue, setTimeValue] = useState<TimeValue>({
        hour: "14",
        minute: "30",
        second: "00",
    });

    const displayText = selectedDate
        ? `${selectedDate.toLocaleDateString("ko-KR")} ${timeValue.hour}:${
              timeValue.minute
          }:${timeValue.second}`
        : "날짜/시간 선택";

    return (
        <>
            <Button
                ref={anchorRef}
                variant="outlined"
                onClick={() => setOpen(true)}
            >
                {displayText}
            </Button>
            <PopupCalendar
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={anchorRef}
                mode="datetime"
                selectedDate={selectedDate}
                onDateChange={(date) => setSelectedDate(date)}
                timeValue={timeValue}
                onTimeChange={(hour, minute, second) =>
                    setTimeValue({ hour, minute, second })
                }
                timeFormat="HH:mm:ss"
            />
        </>
    );
}
```

---

## 고급 사용법

### 날짜 범위 제한

선택 가능한 날짜 범위를 제한합니다.

```tsx
<PopupCalendar
    open={open}
    onClose={() => setOpen(false)}
    anchorEl={anchorRef}
    mode="date"
    selectedDate={selectedDate}
    onDateChange={setSelectedDate}
    minDate={new Date(2024, 0, 1)} // 2024년 1월 1일부터
    maxDate={new Date(2024, 11, 31)} // 2024년 12월 31일까지
/>
```

---

### 시간 범위 제한

선택 가능한 시간 범위를 제한합니다.

```tsx
<PopupCalendar
    open={open}
    onClose={() => setOpen(false)}
    anchorEl={anchorRef}
    mode="time"
    timeValue={timeValue}
    onTimeChange={(hour, minute) => setTimeValue({ hour, minute })}
    timeFormat="HH:mm"
    minTime="09:00" // 오전 9시부터
    maxTime="18:00" // 오후 6시까지
    minuteStep={15} // 15분 단위로 선택
/>
```

---

### 공휴일 표시

공휴일을 빨간색으로 표시합니다.

```tsx
const holidays = [
    new Date(2024, 0, 1), // 신정
    new Date(2024, 2, 1), // 삼일절
    new Date(2024, 4, 5), // 어린이날
    new Date(2024, 5, 6), // 현충일
    new Date(2024, 7, 15), // 광복절
    new Date(2024, 9, 3), // 개천절
    new Date(2024, 9, 9), // 한글날
    new Date(2024, 11, 25), // 성탄절
];

<PopupCalendar
    open={open}
    onClose={() => setOpen(false)}
    anchorEl={anchorRef}
    mode="date"
    selectedDate={selectedDate}
    onDateChange={setSelectedDate}
    holidays={holidays}
/>;
```

---

### autoApply 모드

선택 즉시 적용되는 모드입니다. 확인 버튼 없이 바로 값이 적용됩니다.

```tsx
<PopupCalendar
    open={open}
    onClose={() => setOpen(false)}
    anchorEl={anchorRef}
    mode="datetime"
    selectedDate={selectedDate}
    onDateChange={setSelectedDate}
    timeValue={timeValue}
    onTimeChange={(hour, minute) => setTimeValue({ hour, minute })}
    autoApply={true} // 선택 즉시 적용
/>
```

> **참고**: autoApply가 true일 때는 "확인/취소" 버튼 대신 "닫기" 버튼이 표시됩니다.

---

### 푸터 숨기기

푸터(버튼 영역)를 숨깁니다.

```tsx
<PopupCalendar
    open={open}
    onClose={() => setOpen(false)}
    anchorEl={anchorRef}
    mode="date"
    selectedDate={selectedDate}
    onDateChange={setSelectedDate}
    showFooter={false} // 푸터 숨김
    autoApply={true} // autoApply와 함께 사용 권장
/>
```

---

### 인라인 캘린더

PopupCalendar 없이 캘린더를 직접 표시합니다.

```tsx
import { useState } from "react";
import { Box } from "@mui/material";
import { SimpleCalendar } from "@ehfuse/mui-popup-calendar";

function InlineCalendarExample() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    return (
        <Box
            sx={{
                width: 300,
                height: 340,
                border: "1px solid #ddd",
                borderRadius: 2,
            }}
        >
            <SimpleCalendar
                selectedDate={selectedDate}
                onSelect={setSelectedDate}
                onClose={() => {}}
                showFooter={false}
            />
        </Box>
    );
}
```

---

### 날짜+시간 인라인 캘린더

시간 선택이 포함된 인라인 캘린더입니다.

```tsx
import { useState } from "react";
import { Box } from "@mui/material";
import { SimpleCalendar } from "@ehfuse/mui-popup-calendar";
import type { TimeValue } from "@ehfuse/mui-popup-calendar";

function InlineDateTimeExample() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [timeValue, setTimeValue] = useState<TimeValue>({
        hour: "10",
        minute: "30",
        second: "00",
    });

    return (
        <Box
            sx={{
                width: 420,
                height: 380,
                border: "1px solid #ddd",
                borderRadius: 2,
            }}
        >
            <SimpleCalendar
                selectedDate={selectedDate}
                onSelect={setSelectedDate}
                onClose={() => {}}
                showTimePicker={true}
                timeValue={timeValue}
                onTimeChange={(hour, minute, second) =>
                    setTimeValue({
                        hour: String(hour).padStart(2, "0"),
                        minute: String(minute).padStart(2, "0"),
                        second:
                            second !== undefined
                                ? String(second).padStart(2, "0")
                                : "00",
                    })
                }
                timeFormat="HH:mm:ss"
                autoApply={true}
                showFooter={false}
            />
        </Box>
    );
}
```

---

### 다국어 지원

다양한 언어로 캘린더를 표시할 수 있습니다.

#### 문자열로 간단하게 설정 (권장)

```tsx
import { useState, useRef } from "react";
import { Button } from "@mui/material";
import { PopupCalendar } from "@ehfuse/mui-popup-calendar";

function SimpleLocaleExample() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    return (
        <>
            <Button
                ref={anchorRef}
                variant="outlined"
                onClick={() => setOpen(true)}
            >
                {selectedDate?.toLocaleDateString() ?? "날짜 선택"}
            </Button>
            <PopupCalendar
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={anchorRef}
                mode="date"
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                locale="en" // 간단하게 문자열로!
            />
        </>
    );
}
```

#### 동적 로케일 변경

```tsx
import { useState, useRef } from "react";
import { Button, Stack } from "@mui/material";
import { PopupCalendar, LocaleKey } from "@ehfuse/mui-popup-calendar";

function DynamicLocaleExample() {
    const [open, setOpen] = useState(false);
    const [locale, setLocale] = useState<LocaleKey>("ko");
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    return (
        <>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Button onClick={() => setLocale("en")}>English</Button>
                <Button onClick={() => setLocale("ja")}>日本語</Button>
                <Button onClick={() => setLocale("zhCN")}>中文</Button>
                <Button onClick={() => setLocale("ko")}>한국어</Button>
            </Stack>
            <Button
                ref={anchorRef}
                variant="outlined"
                onClick={() => setOpen(true)}
            >
                {selectedDate?.toLocaleDateString("ko-KR") ?? "날짜 선택"}
            </Button>
            <PopupCalendar
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={anchorRef}
                mode="date"
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                locale={locale}
            />
        </>
    );
}
```

#### 일부 텍스트만 변경

```tsx
// 영어 로케일 기반으로 버튼 텍스트만 변경
<PopupCalendar
    open={open}
    onClose={() => setOpen(false)}
    anchorEl={anchorRef}
    mode="date"
    selectedDate={selectedDate}
    onDateChange={setSelectedDate}
    locale="en"
    texts={{
        confirm: "OK",
        cancel: "Back",
        today: "Now",
    }}
/>
```

#### 커스텀 로케일 생성

```tsx
import type { CalendarLocale } from "@ehfuse/mui-popup-calendar";

// 완전 커스텀 로케일
const myLocale: CalendarLocale = {
    weekdays: ["일", "월", "화", "수", "목", "금", "토"],
    months: [
        "1월", "2월", "3월", "4월", "5월", "6월",
        "7월", "8월", "9월", "10월", "11월", "12월"
    ],
    today: "오늘로",
    confirm: "선택",
    cancel: "돌아가기",
    close: "닫기",
};

<PopupCalendar
    locale={myLocale}
    ...
/>
```

---

## 관련 문서

-   [시작하기](./getting-started.md) - 설치 및 빠른 시작
-   [API 레퍼런스](./api.md) - 모든 Props와 타입 정의
