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
    // 년월 선택 상태
    const [monthOpen, setMonthOpen] = useState(false);
    const monthAnchorRef = useRef<HTMLButtonElement>(null);
    const [selectedYear, setSelectedYear] = useState<number>(
        new Date().getFullYear()
    );
    const [selectedMonth, setSelectedMonth] = useState<number>(
        new Date().getMonth()
    );
    const [monthAutoApply, setMonthAutoApply] = useState(false);

    // 년도만 선택 상태
    const [yearOpen, setYearOpen] = useState(false);
    const yearAnchorRef = useRef<HTMLButtonElement>(null);
    const [selectedYearOnly, setSelectedYearOnly] = useState<number>(
        new Date().getFullYear()
    );
    const [yearAutoApply, setYearAutoApply] = useState(false);

    const handleMonthSelect = (year: number, month: number) => {
        setSelectedYear(year);
        setSelectedMonth(month);
        console.log("Month selected:", year, month + 1);
    };

    const handleYearSelect = (year: number) => {
        setSelectedYearOnly(year);
        console.log("Year selected:", year);
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
                년월/년도 선택
            </Typography>
            <Typography variant="body1" paragraph>
                monthOnly 속성으로 년월만, yearOnly 속성으로 년도만 선택할 수
                있습니다.
            </Typography>

            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                {/* 년월 선택 데모 */}
                <Paper sx={{ p: 3, minWidth: 300 }}>
                    <Typography variant="h6" gutterBottom>
                        년월 선택 (monthOnly)
                    </Typography>

                    <Button
                        ref={monthAnchorRef}
                        variant="contained"
                        onClick={() => setMonthOpen(true)}
                        sx={{ minWidth: 200, mb: 2 }}
                    >
                        {`${selectedYear}년 ${selectedMonth + 1}월`}
                    </Button>

                    <PopupCalendar
                        open={monthOpen}
                        onClose={() => setMonthOpen(false)}
                        anchorEl={monthAnchorRef}
                        mode="date"
                        monthOnly={true}
                        onMonthSelect={handleMonthSelect}
                        autoApply={monthAutoApply}
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={monthAutoApply}
                                onChange={(e) =>
                                    setMonthAutoApply(e.target.checked)
                                }
                            />
                        }
                        label="autoApply"
                    />

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle2" gutterBottom>
                        인라인 데모
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

                {/* 년도만 선택 데모 */}
                <Paper sx={{ p: 3, minWidth: 300 }}>
                    <Typography variant="h6" gutterBottom>
                        년도 선택 (yearOnly)
                    </Typography>

                    <Button
                        ref={yearAnchorRef}
                        variant="contained"
                        onClick={() => setYearOpen(true)}
                        sx={{ minWidth: 200, mb: 2 }}
                    >
                        {`${selectedYearOnly}년`}
                    </Button>

                    <PopupCalendar
                        open={yearOpen}
                        onClose={() => setYearOpen(false)}
                        anchorEl={yearAnchorRef}
                        mode="date"
                        yearOnly={true}
                        onYearSelect={handleYearSelect}
                        autoApply={yearAutoApply}
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={yearAutoApply}
                                onChange={(e) =>
                                    setYearAutoApply(e.target.checked)
                                }
                            />
                        }
                        label="autoApply"
                    />

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle2" gutterBottom>
                        인라인 데모
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
                            yearOnly={true}
                            onYearSelect={(year) => {
                                console.log("Inline year selected:", year);
                                setSelectedYearOnly(year);
                            }}
                            showFooter={false}
                            autoApply={true}
                        />
                    </Box>
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
                    {`// 년월 선택
<PopupCalendar
  open={open}
  onClose={() => setOpen(false)}
  anchorEl={anchorRef}
  mode="date"
  monthOnly={true}
  onMonthSelect={(year, month) => {
    setSelectedYear(year);
    setSelectedMonth(month);
  }}
/>

// 년도만 선택
<PopupCalendar
  open={open}
  onClose={() => setOpen(false)}
  anchorEl={anchorRef}
  mode="date"
  yearOnly={true}
  onYearSelect={(year) => {
    setSelectedYear(year);
  }}
/>`}
                </Box>
            </Paper>
        </Box>
    );
}
