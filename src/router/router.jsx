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
import Dashboard from "../pages/Dashboard";
import LandingPage from "../pages/LandingPage";
import RoomManagementPage from "../pages/RoomManagementPage";


import Reservation from "../components/reservation/Reservation";
import ReservationPage from "../pages/ReservationPage";
import Test from "../pages/Test";
import RoomsPage from "../pages/RoomsPage";
import CottagesPage from "../pages/CottagesPage";
import Reschedule from "../components/landing/reschedule/Reschedule";


export default createBrowserRouter([
    {
        path: 'test',
        element: <Test />
    },
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: 'rooms',
        element: <RoomsPage />
    },
    {
        path: 'cottages',
        element: <CottagesPage />
    },
    {
        path: '/reservation',
        element: <ReservationPage />
    },
    {
        path: '/password-reset/:token',
        element: <PasswordReset />
    },
    {
        path: '/reschedule/:token',
        element: <Reschedule />
    },
    {
        path: "dashboard",
        element: <Dashboard />,
        children: [
            {
                path: "",
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
                path: "record-management",
                element: <RecordManagement />,
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
                path: 'backup-restore',
                element: <BackupAndRestore />
            }
        ],
    },

]);