import { createBrowserRouter, } from "react-router-dom";

import Employees from "../components/employee/Employees";
import Inventory from "../components/inventory/Inventory";
import Profile from "../components/profile/Profile";
import Dashboard from "../pages/Dashboard";
import LandingPage from "../pages/LandingPage";
import Reservation from "../pages/Reservation";
import PasswordReset from "../components/landing/login/PasswordReset";


export default createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />
    },
    {
        path: '/password-reset/:token',
        element: <PasswordReset />
    },
    {
        path: "dashboard",
        element: <Dashboard />,
        children: [
            {
                path: "inventory",
                element: <Inventory />,
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
                element: <Reservation />
            }
        ],
    },

]);