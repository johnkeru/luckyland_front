import { createBrowserRouter, } from "react-router-dom";

import BackupAndRestore from "../components/backup-restore/BackupAndRestore";
import Index from "../components/dashboard/Index";
import Employees from "../components/employee/Employees";
import Inventory from "../components/inventory/Inventory";
import Delivery from "../components/inventory/delivery/Delivery";
import Unavailable from "../components/inventory/unavailable/Unavailable";
import Waste from "../components/inventory/wastes/Waste";
import PasswordReset from "../components/landing/login/PasswordReset";
import Profile from "../components/profile/Profile";
import RecordManagement from "../components/record_management/RecordManagement";
import CottageManagementPage from "../pages/CottageManagementPage";
import Dashboard from "../pages/Dashboard";
import LandingPage from "../pages/LandingPage";
import RoomManagementPage from "../pages/RoomManagementPage";


import Reschedule from "../components/landing/reschedule/Reschedule";
import Reservation from "../components/reservation/Reservation";
import ReservationPage from "../pages/ReservationPage";
import Test from "../pages/Test";

import LandingThemeStyles from '../styles/LandingThemeStyles';
import DashboardThemeStyles from "../styles/DashboardThemeStyles";


export default createBrowserRouter([
    {
        path: 'test',
        element: <Test />
    },
    {
        path: '/',
        element: <LandingThemeStyles>
            <LandingPage />
        </LandingThemeStyles>
    },
    {
        path: '/create-reservation',
        element: <LandingThemeStyles>
            <ReservationPage />
        </LandingThemeStyles>
    },
    {
        path: '/reschedule/:token',
        element: <LandingThemeStyles>
            <Reschedule />
        </LandingThemeStyles>
    },
    {
        path: '/password-reset/:token',
        element: <PasswordReset />
    },
    {
        path: "",
        element: <DashboardThemeStyles>
            <Dashboard />
        </DashboardThemeStyles>,
        children: [
            {
                path: "dashboard",
                element: <Index />,
            },
            {
                path: "inventory/",
                element: <Inventory />,
            },
            {
                path: 'inventory/delivery',
                element: <Delivery />
            },
            {
                path: 'inventory/waste',
                element: <Waste />
            },
            {
                path: 'inventory/unavailable',
                element: <Unavailable />
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: 'employee',
                element: <Employees />
            },
            {
                path: 'reservation',
                element: <Reservation />,
            },
            {
                path: 'facilities/room-management',
                element: <RoomManagementPage />
            },
            {
                path: 'facilities/cottage-management',
                element: <CottageManagementPage />
            },
            {
                path: "record-management",
                element: <RecordManagement />,
            },
            {
                path: 'backup-restore',
                element: <BackupAndRestore />
            }
        ],
    },

]);