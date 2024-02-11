import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DashboardDrawer from '../utility_components/DashboardDrawer';
import DashboardNavbar from '../components/DashboardNavbar';
import useUser from '../hooks/useUser';

const Dashboard = () => {
    const { user } = useUser();
    const nav = useNavigate();

    useEffect(() => {
        if (!user) {
            nav('/login');
        }
    }, [user]);

    return (
        <div className="flex ">
            {user ? <>
                {/* Side */}
                <DashboardDrawer user={user} />

                <div className="flex flex-col w-full ml-1/4">
                    {/* Top */}
                    <DashboardNavbar user={user} />

                    <div className="px-4">
                        <Outlet />
                    </div>
                </div>
            </> : undefined}
            <ToastContainer />
        </div>
    );
};

export default Dashboard;
