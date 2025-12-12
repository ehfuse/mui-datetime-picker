import { Typography, Box, Paper } from "@mui/material";

export default function HomePage() {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                @ehfuse/mui-popup-calendar
            </Typography>
            <Typography variant="body1" paragraph>
                MUI 기반의 팝업 캘린더 및 시간 선택 컴포넌트 라이브러리입니다.
            </Typography>

            <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                    컴포넌트 목록
                </Typography>
                <Typography variant="body2" component="ul">
                    <li>
                        <strong>SimpleCalendar</strong> - 날짜 선택 캘린더 (시간
                        선택 옵션 포함)
                    </li>
                    <li>
                        <strong>TimePicker</strong> - Popover 기반 시간 선택기
                    </li>
                    <li>
                        <strong>TimeSelector</strong> - 시간 선택 UI (재사용
                        가능)
                    </li>
                    <li>
                        <strong>PopupCalendar</strong> - Popover 기반 통합
                        날짜/시간 선택기
                    </li>
                </Typography>
            </Paper>

            <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                    설치
                </Typography>
                <Box
                    component="pre"
                    sx={{
                        bgcolor: "grey.100",
                        p: 2,
                        borderRadius: 1,
                        overflow: "auto",
                    }}
                >
                    npm install @ehfuse/mui-popup-calendar
                </Box>
            </Paper>

            <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                    기본 사용법
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

function MyComponent() {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [date, setDate] = useState(null)

  return (
    <>
      <Button onClick={(e) => {
        setAnchorEl(e.currentTarget)
        setOpen(true)
      }}>
        날짜 선택
      </Button>
      <PopupCalendar
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={anchorEl}
        mode="date"
        selectedDate={date}
        onDateChange={setDate}
      />
    </>
  )
}`}
                </Box>
            </Paper>
        </Box>
    );
}
