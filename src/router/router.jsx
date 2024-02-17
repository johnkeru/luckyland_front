import { createBrowserRouter, } from "react-router-dom";

import Inventory from "../components/inventory/Inventory";
import Login from "../pages/Login";
import Employees from "../components/employee/Employees";
import Profile from "../components/profile/Profile";
import LandingPage from "../pages/LandingPage";
import Booking from "../pages/Booking";
import Dashboard from "../pages/Dashboard";


export default createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/book',
        element: <Booking />
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
                path: 'employees',
                element: <Employees />
            },
        ],
    },

]);