# Examples

## Table of Contents

-   [Basic Usage](#basic-usage)
    -   [Date Selection](#date-selection)
    -   [Time Selection](#time-selection)
    -   [Date + Time Selection](#date--time-selection)
    -   [Month Selection](#month-selection)
-   [Advanced Usage](#advanced-usage)
    -   [Date Range Restriction](#date-range-restriction)
    -   [Time Range Restriction](#time-range-restriction)
    -   [Holiday Display](#holiday-display)
    -   [autoApply Mode](#autoapply-mode)
    -   [Hide Footer](#hide-footer)
    -   [Inline Calendar](#inline-calendar)
    -   [Internationalization (i18n)](#internationalization-i18n)

---

## Basic Usage

### Date Selection

The most basic date selection example.

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
                {selectedDate?.toLocaleDateString() ?? "Select Date"}
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

### Time Selection

Example for selecting time only.

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

### Date + Time Selection

Example for selecting both date and time.

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
        ? `${selectedDate.toLocaleDateString()} ${timeValue.hour}:${
              timeValue.minute
          }:${timeValue.second}`
        : "Select Date/Time";

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

### Month Selection

Example for selecting year and month only, without date.

```tsx
import { useState, useRef } from "react";
import { Button } from "@mui/material";
import { PopupCalendar } from "@ehfuse/mui-popup-calendar";

function MonthPickerExample() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

    const handleMonthSelect = (year: number, month: number) => {
        setSelectedYear(year);
        setSelectedMonth(month);
    };

    return (
        <>
            <Button
                ref={anchorRef}
                variant="outlined"
                onClick={() => setOpen(true)}
            >
                {`${selectedYear}/${selectedMonth + 1}`}
            </Button>
            <PopupCalendar
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={anchorRef}
                mode="date"
                monthOnly={true}
                onMonthSelect={handleMonthSelect}
            />
        </>
    );
}
```

---

## Advanced Usage

### Date Range Restriction

Restrict the selectable date range.

```tsx
<PopupCalendar
    open={open}
    onClose={() => setOpen(false)}
    anchorEl={anchorRef}
    mode="date"
    selectedDate={selectedDate}
    onDateChange={setSelectedDate}
    minDate={new Date(2024, 0, 1)} // From January 1, 2024
    maxDate={new Date(2024, 11, 31)} // Until December 31, 2024
/>
```

---

### Time Range Restriction

Restrict the selectable time range.

```tsx
<PopupCalendar
    open={open}
    onClose={() => setOpen(false)}
    anchorEl={anchorRef}
    mode="time"
    timeValue={timeValue}
    onTimeChange={(hour, minute) => setTimeValue({ hour, minute })}
    timeFormat="HH:mm"
    minTime="09:00" // From 9 AM
    maxTime="18:00" // Until 6 PM
    minuteStep={15} // Select in 15-minute intervals
/>
```

---

### Holiday Display

Display holidays in red.

```tsx
const holidays = [
    new Date(2024, 0, 1), // New Year's Day
    new Date(2024, 6, 4), // Independence Day
    new Date(2024, 10, 28), // Thanksgiving
    new Date(2024, 11, 25), // Christmas
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

### autoApply Mode

Mode where selection is applied immediately. Values are applied directly without a confirm button.

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
    autoApply={true} // Apply immediately on selection
/>
```

> **Note**: When autoApply is true, a "Close" button is displayed instead of "Confirm/Cancel" buttons.

---

### Hide Footer

Hide the footer (button area).

```tsx
<PopupCalendar
    open={open}
    onClose={() => setOpen(false)}
    anchorEl={anchorRef}
    mode="date"
    selectedDate={selectedDate}
    onDateChange={setSelectedDate}
    showFooter={false} // Hide footer
    autoApply={true} // Recommended to use with autoApply
/>
```

---

### Inline Calendar

Display calendar directly without PopupCalendar.

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

### Inline Date + Time Calendar

Inline calendar with time selection included.

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

### Internationalization (i18n)

Display the calendar in various languages.

#### Simple String Key (Recommended)

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
                {selectedDate?.toLocaleDateString() ?? "Select Date"}
            </Button>
            <PopupCalendar
                open={open}
                onClose={() => setOpen(false)}
                anchorEl={anchorRef}
                mode="date"
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                locale="en" // Simple string key!
            />
        </>
    );
}
```

#### Dynamic Locale Switching

```tsx
import { useState, useRef } from "react";
import { Button, Stack } from "@mui/material";
import { PopupCalendar, LocaleKey } from "@ehfuse/mui-popup-calendar";

function DynamicLocaleExample() {
    const [open, setOpen] = useState(false);
    const [locale, setLocale] = useState<LocaleKey>("en");
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
                {selectedDate?.toLocaleDateString() ?? "Select Date"}
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

#### Partial Text Overrides

```tsx
// Override only button texts based on English locale
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

#### Creating Custom Locale

```tsx
import type { CalendarLocale } from "@ehfuse/mui-popup-calendar";

// Fully custom locale
const myLocale: CalendarLocale = {
    weekdays: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    months: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ],
    today: "Go to Today",
    confirm: "Select",
    cancel: "Go Back",
    close: "Close",
};

<PopupCalendar
    locale={myLocale}
    ...
/>
```

---

## Related Documents

-   [Getting Started](./getting-started.md) - Installation and quick start
-   [API Reference](./api.md) - All Props and type definitions
