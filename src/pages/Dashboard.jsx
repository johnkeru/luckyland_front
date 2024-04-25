import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import React, { useEffect, useState } from 'react';
import useUser from '../hooks/useUser';

import { Outlet, useNavigate } from 'react-router';
import DashboardDrawer from '../components/dashboard/DashboardDrawer';
import DashboardNavbar from '../components/dashboard/DashboardNavbar';
import useCategories from '../hooks/inventory/useCategories';
import basicGetCall from '../utility_functions/axiosCalls/basicGetCall';
import CopyRight from '../utility_components/CopyRight';

export const drawerWidth = 300;

export default function Dashboard() {
    const { user } = useUser();
    const [open, setOpen] = useState(false);
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
        <>
            {user ? <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <DashboardNavbar open={open} toggleDrawer={toggleDrawer} user={user} />
                <DashboardDrawer toggleDrawer={toggleDrawer} open={open} setOpen={setOpen} user={user} />

                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[200]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Box p={{ xs: 0, sm: 2 }}>
                        <Outlet />
                        <CopyRight sx={{ mt: 2 }} />
                    </Box>
                </Box>
            </Box> : undefined}
        </>
    );
}