import { createBrowserRouter, } from "react-router-dom";

import Backup from "../components/backup-restore/Backup";
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



export default createBrowserRouter([
    {
        path: 'test',
        element: <Test />
    },
    {
        path: '/',
        element: <LandingPage />
    },
    {
        path: '/create-reservation',
        element: <ReservationPage />
    },
    {
        path: '/reschedule/:token',
        element: <Reschedule />
    },
    {
        path: '/password-reset/:token',
        element: <PasswordReset />
    },
    {
        path: "",
        element: <Dashboard />,
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
                path: 'backup',
                element: <Backup />
            }
        ],
    },

]);