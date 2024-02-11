import { createBrowserRouter, } from "react-router-dom";

import Dashboard from '../pages/Dashboard';
import Inventories from "../components/inventory/Inventories";
import Login from "../pages/Login";
import Employees from "../components/employee/Employees";
import Profile from "../components/profile/Profile";
import Testing from "../pages/Testing";
import LandingPage from "../pages/LandingPage";
import Booking from "../pages/Booking";
import InventoriesV2 from "../components/inventory/InventoriesV2";


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
        path: '/test',
        element: <Testing />
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
                path: "inventories",
                element: <Inventories />,
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