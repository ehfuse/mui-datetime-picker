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
import { PopupCalendar, SimpleCalendar } from "@ehfuse/mui-popup-calendar";

export default function MonthPickerPage() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);

    const [selectedYear, setSelectedYear] = useState<number>(
        new Date().getFullYear()
    );
    const [selectedMonth, setSelectedMonth] = useState<number>(
        new Date().getMonth()
    );
    const [autoApply, setAutoApply] = useState(false);

    const handleMonthSelect = (year: number, month: number) => {
        setSelectedYear(year);
        setSelectedMonth(month);
        console.log("Month selected:", year, month + 1);
    };

    const getDisplayText = () => {
        return `${selectedYear}년 ${selectedMonth + 1}월`;
    };

    const monthNames = [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
    ];

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                년월 선택 (Month Picker)
            </Typography>
            <Typography variant="body1" paragraph>
                monthOnly 속성을 사용하여 년월만 선택할 수 있는 캘린더입니다.
                날짜 선택 없이 년도와 월만 선택하고 싶을 때 유용합니다.
            </Typography>

            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                {/* 데모 영역 */}
                <Paper sx={{ p: 3, minWidth: 300 }}>
                    <Typography variant="h6" gutterBottom>
                        PopupCalendar 데모
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
                        mode="date"
                        monthOnly={true}
                        onMonthSelect={handleMonthSelect}
                        autoApply={autoApply}
                    />

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle2" gutterBottom>
                        SimpleCalendar 데모 (인라인)
                    </Typography>

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
                            selectedDate={null}
                            onSelect={() => {}}
                            onClose={() => {}}
                            monthOnly={true}
                            onMonthSelect={(year, month) => {
                                console.log(
                                    "Inline month selected:",
                                    year,
                                    monthNames[month]
                                );
                                setSelectedYear(year);
                                setSelectedMonth(month);
                            }}
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

                    <FormControlLabel
                        control={
                            <Switch
                                checked={autoApply}
                                onChange={(e) => setAutoApply(e.target.checked)}
                            />
                        }
                        label="autoApply"
                    />

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle2" gutterBottom>
                        선택된 값
                    </Typography>

                    <TextField
                        label="년도"
                        value={selectedYear}
                        size="small"
                        fullWidth
                        InputProps={{ readOnly: true }}
                        sx={{ mb: 1 }}
                    />

                    <TextField
                        label="월"
                        value={`${selectedMonth + 1}월`}
                        size="small"
                        fullWidth
                        InputProps={{ readOnly: true }}
                    />
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

const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

const handleMonthSelect = (year: number, month: number) => {
  setSelectedYear(year);
  setSelectedMonth(month);
};

<PopupCalendar
  open={open}
  onClose={() => setOpen(false)}
  anchorEl={anchorRef}
  mode="date"
  monthOnly={true}
  onMonthSelect={handleMonthSelect}
/>`}
                </Box>
            </Paper>
        </Box>
    );
}
