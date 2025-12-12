import { useState, useRef } from "react";
import {
    Box,
    Typography,
    Paper,
    Button,
    TextField,
    FormControlLabel,
    Switch,
    Divider,
} from "@mui/material";
import { TimePicker, TimeSelector } from "@ehfuse/mui-popup-calendar";

export default function TimePickerPage() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [timeValue, setTimeValue] = useState({
        hour: "14",
        minute: "30",
        second: "00",
    });
    const [hasSeconds, setHasSeconds] = useState(false);
    const [minuteStep, setMinuteStep] = useState(1);

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
    };

    // TimeSelector용
    const [selectorTime, setSelectorTime] = useState({
        hour: "09",
        minute: "00",
        second: "00",
    });

    const handleSelectorChange = (
        hour: number,
        minute: number,
        second?: number
    ) => {
        setSelectorTime({
            hour: String(hour).padStart(2, "0"),
            minute: String(minute).padStart(2, "0"),
            second:
                second !== undefined ? String(second).padStart(2, "0") : "00",
        });
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                TimePicker & TimeSelector
            </Typography>
            <Typography variant="body1" paragraph>
                시간 선택 컴포넌트입니다. TimePicker는 Popover 형태,
                TimeSelector는 인라인 형태입니다.
            </Typography>

            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                {/* TimePicker (Popover) */}
                <Paper sx={{ p: 3, minWidth: 300 }}>
                    <Typography variant="h6" gutterBottom>
                        TimePicker (Popover)
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={hasSeconds}
                                    onChange={(e) =>
                                        setHasSeconds(e.target.checked)
                                    }
                                />
                            }
                            label="초 단위 포함"
                        />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <TextField
                            label="분 간격"
                            type="number"
                            value={minuteStep}
                            onChange={(e) =>
                                setMinuteStep(Number(e.target.value) || 1)
                            }
                            size="small"
                            inputProps={{ min: 1, max: 30 }}
                            sx={{ width: 100 }}
                        />
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Button
                        ref={anchorRef}
                        variant="outlined"
                        onClick={() => setOpen(true)}
                    >
                        시간 선택: {timeValue.hour}:{timeValue.minute}
                        {hasSeconds ? `:${timeValue.second}` : ""}
                    </Button>

                    <TimePicker
                        anchorEl={anchorRef}
                        open={open}
                        onClose={() => setOpen(false)}
                        value={timeValue}
                        onChange={handleTimeChange}
                        format={hasSeconds ? "HH:mm:ss" : "HH:mm"}
                        minuteStep={minuteStep}
                    />
                </Paper>

                {/* TimeSelector (Inline) */}
                <Paper sx={{ p: 3, minWidth: 200 }}>
                    <Typography variant="h6" gutterBottom>
                        TimeSelector (Inline)
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 2 }}>
                        선택된 시간: {selectorTime.hour}:{selectorTime.minute}
                    </Typography>

                    <Box
                        sx={{
                            height: 280,
                            border: 1,
                            borderColor: "divider",
                            borderRadius: 1,
                        }}
                    >
                        <TimeSelector
                            value={selectorTime}
                            onChange={handleSelectorChange}
                            format="HH:mm"
                            showHeader
                        />
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}
