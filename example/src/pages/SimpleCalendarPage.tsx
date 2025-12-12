import { useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Divider,
    FormControlLabel,
    Switch,
    TextField,
} from "@mui/material";
import { SimpleCalendar } from "@ehfuse/mui-popup-calendar";

export default function SimpleCalendarPage() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [timeValue, setTimeValue] = useState({
        hour: "10",
        minute: "30",
        second: "00",
    });
    const [timeFormat, setTimeFormat] = useState<"HH:mm" | "HH:mm:ss">("HH:mm");

    const handleTimeChange = (
        hour: number,
        minute: number,
        second?: number
    ) => {
        setTimeValue({
            hour: String(hour).padStart(2, "0"),
            minute: String(minute).padStart(2, "0"),
            second:
                second !== undefined ? String(second).padStart(2, "0") : "00",
        });
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                SimpleCalendar
            </Typography>
            <Typography variant="body1" paragraph>
                기본 캘린더 컴포넌트입니다. 날짜 선택과 함께 시간 선택 옵션을
                제공합니다.
            </Typography>

            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                {/* 컨트롤 패널 */}
                <Paper sx={{ p: 3, minWidth: 280 }}>
                    <Typography variant="h6" gutterBottom>
                        옵션
                    </Typography>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={showTimePicker}
                                onChange={(e) =>
                                    setShowTimePicker(e.target.checked)
                                }
                            />
                        }
                        label="시간 선택 표시"
                    />
                    {showTimePicker && (
                        <Box sx={{ mt: 2 }}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={timeFormat === "HH:mm:ss"}
                                        onChange={(e) =>
                                            setTimeFormat(
                                                e.target.checked
                                                    ? "HH:mm:ss"
                                                    : "HH:mm"
                                            )
                                        }
                                    />
                                }
                                label="초 단위 포함"
                            />
                        </Box>
                    )}

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle2" gutterBottom>
                        선택된 값
                    </Typography>
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
                    {showTimePicker && (
                        <TextField
                            label="시간"
                            value={`${timeValue.hour}:${timeValue.minute}${
                                timeFormat === "HH:mm:ss"
                                    ? ":" + timeValue.second
                                    : ""
                            }`}
                            size="small"
                            fullWidth
                            InputProps={{ readOnly: true }}
                        />
                    )}
                </Paper>

                {/* 캘린더 */}
                <Paper sx={{ width: showTimePicker ? 420 : 300, height: 380 }}>
                    <SimpleCalendar
                        selectedDate={selectedDate}
                        onSelect={(date) => {
                            setSelectedDate(date);
                            console.log("Selected date:", date);
                        }}
                        onClose={() => console.log("Close requested")}
                        showTimePicker={showTimePicker}
                        timeValue={timeValue}
                        onTimeChange={handleTimeChange}
                        timeFormat={timeFormat}
                        showToday
                    />
                </Paper>
            </Box>
        </Box>
    );
}
