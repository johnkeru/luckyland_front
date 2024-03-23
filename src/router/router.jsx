import { createBrowserRouter, } from "react-router-dom";

import Employees from "../components/employee/Employees";
import Inventory from "../components/inventory/Inventory";
import Profile from "../components/profile/Profile";
import Dashboard from "../pages/Dashboard";
import LandingPage from "../pages/LandingPage";
import PasswordReset from "../components/landing/login/PasswordReset";
import Delivery from "../components/inventory/delivery/Delivery";
import Waste from "../components/inventory/wastes/Waste";
import Unavailable from "../components/inventory/unavailable/Unavailable";
import GcashPaymentLink from "../components/landing/gcash-payment/GcashPaymentLink";
import Index from "../components/dashboard/Index";
import RecordManagement from "../components/record_management/RecordManagement";
import BackupAndRestore from "../components/backup-restore/BackupAndRestore";
import RescheduleBooking from "../components/reschedule/RescheduleBooking";
import RoomManagement from "../pages/RoomManagementPage";
import ReservationNew from "../pages/Reservation";
import Reservation from "../components/reservation/Reservation";
import RoomManagementPage from "../pages/RoomManagementPage";


export default createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />
    },
    {
        path: '/test',
        element: <ReservationNew />
    },
    {
        path: '/password-reset/:token',
        element: <PasswordReset />
    },
    {
        path: '/reservation-gcash-payment/:token',
        element: <GcashPaymentLink />
    },
    {
        path: '/reschedule/:token',
        element: <RescheduleBooking />
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
                element: <Reservation />
            },
            {
                path: 'room-management',
                element: <RoomManagementPage />
            },
            {
                path: 'backup-restore',
                element: <BackupAndRestore />
            }
        ],
    },

]);