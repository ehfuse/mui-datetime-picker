import { Routes, Route, Link } from "react-router-dom";
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import SimpleCalendarPage from "./pages/SimpleCalendarPage";
import TimePickerPage from "./pages/TimePickerPage";
import PopupCalendarPage from "./pages/PopupCalendarPage";
import MonthPickerPage from "./pages/MonthPickerPage";
import HomePage from "./pages/HomePage";

const DRAWER_WIDTH = 220;

function App() {
    return (
        <Box sx={{ display: "flex" }}>
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        @ehfuse/mui-popup-calendar Examples
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    width: DRAWER_WIDTH,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: DRAWER_WIDTH,
                        boxSizing: "border-box",
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: "auto" }}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/">
                                <ListItemText primary="홈" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                to="/simple-calendar"
                            >
                                <ListItemText primary="SimpleCalendar" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/time-picker">
                                <ListItemText primary="TimePicker" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                to="/popup-calendar"
                            >
                                <ListItemText primary="PopupCalendar" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/month-picker">
                                <ListItemText primary="MonthPicker" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/simple-calendar"
                        element={<SimpleCalendarPage />}
                    />
                    <Route path="/time-picker" element={<TimePickerPage />} />
                    <Route
                        path="/popup-calendar"
                        element={<PopupCalendarPage />}
                    />
                    <Route path="/month-picker" element={<MonthPickerPage />} />
                </Routes>
            </Box>
        </Box>
    );
}

export default App;
