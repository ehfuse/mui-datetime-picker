import { useState, useRef } from "react";
import {
    Box,
    Typography,
    Paper,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormControlLabel,
    Switch,
    Divider,
} from "@mui/material";
import { PopupCalendar, SimpleCalendar } from "@ehfuse/mui-popup-calendar";
import type { PopupCalendarMode, TimeFormat } from "@ehfuse/mui-popup-calendar";

export default function PopupCalendarPage() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    const [mode, setMode] = useState<PopupCalendarMode>("datetime");
    const [timeFormat, setTimeFormat] = useState<TimeFormat>("HH:mm");
    const [showToday, setShowToday] = useState(true);
    const [showFooter, setShowFooter] = useState(true);
    const [autoApply, setAutoApply] = useState(false);

    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [timeValue, setTimeValue] = useState({
        hour: "10",
        minute: "30",
        second: "00",
    });

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
        console.log("Date changed:", date);
    };

    const handleTimeChange = (
        hour: string,
        minute: string,
        second?: string
    ) => {
        setTimeValue({
            hour,
            minute,
            second: second ?? "00",
        });
        console.log("Time changed:", hour, minute, second);
    };

    const getDisplayText = () => {
        const datePart = selectedDate
            ? selectedDate.toLocaleDateString("ko-KR")
            : "날짜 선택";
        const hasSeconds =
            timeFormat === "HH:mm:ss" || timeFormat === "hh:mm:ss";
        const timePart = `${timeValue.hour}:${timeValue.minute}${
            hasSeconds ? ":" + timeValue.second : ""
        }`;

        switch (mode) {
            case "date":
                return datePart;
            case "time":
                return timePart;
            case "datetime":
                return `${datePart} ${timePart}`;
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                PopupCalendar
            </Typography>
            <Typography variant="body1" paragraph>
                Popover 기반의 통합 날짜/시간 선택 컴포넌트입니다. mode 속성으로
                날짜만, 시간만, 또는 둘 다 선택할 수 있습니다.
            </Typography>

            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                {/* 데모 영역 */}
                <Paper sx={{ p: 3, minWidth: 300 }}>
                    <Typography variant="h6" gutterBottom>
                        데모
                    </Typography>

                    <Button
                        ref={anchorRef}
                        variant="contained"
                        onClick={() => setOpen(true)}
                        sx={{ minWidth: 200, mb: 2 }}
                    >
                        {getDisplayText()}
                    </Button>

                    <PopupCalendar
                        open={open}
                        onClose={() => setOpen(false)}
                        anchorEl={anchorRef}
                        mode={mode}
                        selectedDate={selectedDate}
                        onDateChange={handleDateChange}
                        timeValue={timeValue}
                        onTimeChange={handleTimeChange}
                        timeFormat={timeFormat}
                        showToday={showToday}
                        showFooter={showFooter}
                        autoApply={autoApply}
                    />

                    <Box
                        sx={{
                            width: 270,
                            height: 300,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2,
                        }}
                    >
                        <SimpleCalendar
                            selectedDate={selectedDate}
                            onSelect={handleDateChange}
                            onClose={() => {}}
                            showTimePicker={false}
                            showFooter={false}
                            autoApply={true}
                        />
                    </Box>
                </Paper>

                {/* 컨트롤 패널 */}
                <Paper sx={{ p: 3, minWidth: 300 }}>
                    <Typography variant="h6" gutterBottom>
                        옵션
                    </Typography>

                    <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                        <InputLabel>Mode</InputLabel>
                        <Select
                            value={mode}
                            label="Mode"
                            onChange={(e) =>
                                setMode(e.target.value as PopupCalendarMode)
                            }
                        >
                            <MenuItem value="date">date (날짜만)</MenuItem>
                            <MenuItem value="time">time (시간만)</MenuItem>
                            <MenuItem value="datetime">
                                datetime (날짜+시간)
                            </MenuItem>
                        </Select>
                    </FormControl>

                    {mode !== "date" && (
                        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                            <InputLabel>Time Format</InputLabel>
                            <Select
                                value={timeFormat}
                                label="Time Format"
                                onChange={(e) =>
                                    setTimeFormat(e.target.value as TimeFormat)
                                }
                            >
                                <MenuItem value="HH:mm">
                                    HH:mm (24시간)
                                </MenuItem>
                                <MenuItem value="HH:mm:ss">
                                    HH:mm:ss (24시간 + 초)
                                </MenuItem>
                                <MenuItem value="hh:mm">
                                    hh:mm (12시간)
                                </MenuItem>
                                <MenuItem value="hh:mm:ss">
                                    hh:mm:ss (12시간 + 초)
                                </MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    {mode !== "time" && (
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={showToday}
                                    onChange={(e) =>
                                        setShowToday(e.target.checked)
                                    }
                                />
                            }
                            label="오늘 버튼 표시"
                        />
                    )}

                    <FormControlLabel
                        control={
                            <Switch
                                checked={showFooter}
                                onChange={(e) =>
                                    setShowFooter(e.target.checked)
                                }
                            />
                        }
                        label="푸터 표시 (showFooter)"
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={autoApply}
                                onChange={(e) => setAutoApply(e.target.checked)}
                            />
                        }
                        label="선택 즉시 적용 (autoApply)"
                    />

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle2" gutterBottom>
                        선택된 값
                    </Typography>

                    {mode !== "time" && (
                        <TextField
                            label="날짜"
                            value={
                                selectedDate
                                    ? selectedDate.toLocaleDateString("ko-KR")
                                    : ""
                            }
                            size="small"
                            fullWidth
                            InputProps={{ readOnly: true }}
                            sx={{ mb: 1 }}
                        />
                    )}

                    {mode !== "date" && (
                        <TextField
                            label="시간"
                            value={`${timeValue.hour}:${timeValue.minute}${
                                timeFormat.includes("ss")
                                    ? ":" + timeValue.second
                                    : ""
                            }`}
                            size="small"
                            fullWidth
                            InputProps={{ readOnly: true }}
                        />
                    )}
                </Paper>
            </Box>

            {/* 코드 예시 */}
            <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                    코드 예시
                </Typography>
                <Box
                    component="pre"
                    sx={{
                        bgcolor: "grey.100",
                        p: 2,
                        borderRadius: 1,
                        overflow: "auto",
                        fontSize: "0.875rem",
                    }}
                >
                    {`import { PopupCalendar } from '@ehfuse/mui-popup-calendar'

<PopupCalendar
  open={open}
  onClose={() => setOpen(false)}
  anchorEl={anchorRef.current}
  mode="${mode}"
  selectedDate={selectedDate}
  onDateChange={handleDateChange}
  timeValue={timeValue}
  onTimeChange={handleTimeChange}
  timeFormat="${timeFormat}"
  showToday={${showToday}}
  autoApply={${autoApply}}
/>`}
                </Box>
            </Paper>
        </Box>
    );
}
