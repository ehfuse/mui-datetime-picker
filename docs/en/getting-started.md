# Getting Started

A MUI-based popup calendar and time picker component library.

## Installation

```bash
npm install @ehfuse/mui-popup-calendar
```

### Peer Dependencies

The following packages are required:

```bash
npm install @mui/material @emotion/react @emotion/styled @ehfuse/overlay-scrollbar
```

## Quick Start

### PopupCalendar (Recommended)

The most commonly used component. You can select date, time, or both.

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
                {selectedDate?.toLocaleDateString() ?? "Select Date"}
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

Use this to display an inline calendar.

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

## Mode Description

PopupCalendar supports 3 modes:

| Mode       | Description               |
| ---------- | ------------------------- |
| `date`     | Select date only          |
| `time`     | Select time only          |
| `datetime` | Select both date and time |

```tsx
// Date only
<PopupCalendar mode="date" ... />

// Time only
<PopupCalendar mode="time" ... />

// Date + Time
<PopupCalendar mode="datetime" ... />
```

## Time Format

4 time formats are supported:

| Format     | Description       | Example  |
| ---------- | ----------------- | -------- |
| `HH:mm`    | 24-hour           | 14:30    |
| `HH:mm:ss` | 24-hour + seconds | 14:30:45 |
| `hh:mm`    | 12-hour           | 02:30    |
| `hh:mm:ss` | 12-hour + seconds | 02:30:45 |

---

## Related Documents

-   [API Reference](./api.md) - All Props and type definitions
-   [Examples](./example.md) - Various usage examples
