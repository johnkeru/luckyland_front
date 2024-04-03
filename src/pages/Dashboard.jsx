import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import useUser from '../hooks/useUser';

import { Outlet, useNavigate } from 'react-router';
import DashboardDrawer from '../components/dashboard/DashboardDrawer';
import DashboardNavbar from '../components/dashboard/DashboardNavbar';
import useCategories from '../hooks/inventory/useCategories';
import basicGetCall from '../utility_functions/axiosCalls/basicGetCall';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="http://localhost:5000">
                LuckyLand Resort
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export const drawerWidth = 300;



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
    const [currentPath, setCurrentPath] = useState('Dashboard');

    const { user } = useUser();
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => setOpen(!open);

    const nav = useNavigate();

    useEffect(() => {
        if (!user) nav('/');
    }, [user]);

    const { setCategories } = useCategories();

    useEffect(() => {
        basicGetCall({
            endpoint: 'api/categories',
            setDataDirectly: setCategories
        });
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            {user ? <Box sx={{ display: 'flex' }}>
                <CssBaseline />

                <DashboardNavbar open={open} toggleDrawer={toggleDrawer} user={user} currentPath={currentPath} />

                <DashboardDrawer toggleDrawer={toggleDrawer} open={open} setOpen={setOpen} user={user} setCurrentPath={setCurrentPath} />

                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Box p={2}>
                        <Outlet />
                        <Copyright sx={{ pt: 4 }} />
                    </Box>
                </Box>
            </Box> : undefined}
        </ThemeProvider >
    );
}