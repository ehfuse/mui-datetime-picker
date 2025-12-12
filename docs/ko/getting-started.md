# 시작하기

MUI 기반의 팝업 캘린더/시간 선택 컴포넌트 라이브러리입니다.

## 설치

```bash
npm install @ehfuse/mui-popup-calendar
```

### Peer Dependencies

다음 패키지들이 필요합니다:

```bash
npm install @mui/material @emotion/react @emotion/styled
```

## 빠른 시작

### PopupCalendar (권장)

가장 많이 사용되는 컴포넌트입니다. 날짜, 시간, 또는 둘 다 선택할 수 있습니다.

```tsx
import { useState, useRef } from "react";
import { Button } from "@mui/material";
import { PopupCalendar } from "@ehfuse/mui-popup-calendar";

function App() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    return (
        <>
            <Button ref={anchorRef} onClick={() => setOpen(true)}>
                {selectedDate?.toLocaleDateString() ?? "날짜 선택"}
            </Button>
            <PopupCalendar
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={anchorRef}
                mode="date"
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
            />
        </>
    );
}
```

### SimpleCalendar

인라인으로 캘린더를 표시할 때 사용합니다.

```tsx
import { useState } from "react";
import { SimpleCalendar } from "@ehfuse/mui-popup-calendar";

function App() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    return (
        <div style={{ width: 300, height: 340 }}>
            <SimpleCalendar
                selectedDate={selectedDate}
                onSelect={setSelectedDate}
                onClose={() => {}}
                showFooter={false}
            />
        </div>
    );
}
```

## 모드 설명

PopupCalendar는 3가지 모드를 지원합니다:

| 모드       | 설명                  |
| ---------- | --------------------- |
| `date`     | 날짜만 선택           |
| `time`     | 시간만 선택           |
| `datetime` | 날짜와 시간 모두 선택 |

```tsx
// 날짜만 선택
<PopupCalendar mode="date" ... />

// 시간만 선택
<PopupCalendar mode="time" ... />

// 날짜+시간 선택
<PopupCalendar mode="datetime" ... />
```

## 시간 포맷

4가지 시간 포맷을 지원합니다:

| 포맷       | 설명          | 예시     |
| ---------- | ------------- | -------- |
| `HH:mm`    | 24시간제      | 14:30    |
| `HH:mm:ss` | 24시간제 + 초 | 14:30:45 |
| `hh:mm`    | 12시간제      | 02:30    |
| `hh:mm:ss` | 12시간제 + 초 | 02:30:45 |

---

## 관련 문서

-   [API 레퍼런스](./api.md) - 모든 Props와 타입 정의
-   [예제](./example.md) - 다양한 사용 예제
