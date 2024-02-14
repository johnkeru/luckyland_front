import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DashboardDrawer from '../utility_components/DashboardDrawer';
import DashboardNavbar from '../components/DashboardNavbar';
import useUser from '../hooks/useUser';
import { Grid } from '@mui/material';

const Dashboard = () => {
    const { user } = useUser();
    const nav = useNavigate();

    useEffect(() => {
        if (!user) {
            nav('/login');
        }
    }, [user]);

    return (
        <Grid display={'flex'}>
            {user ? <>
                {/* Side */}
                <DashboardDrawer user={user} />

                <Grid sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    {/* Top */}
                    <DashboardNavbar user={user} />
                    <Outlet />
                </Grid>

            </> : undefined}
            <ToastContainer />
        </Grid>
    );
};

export default Dashboard;
