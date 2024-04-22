import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from "@emotion/react";
import theme from "./styles/globalStyle.js";


ReactDOM.createRoot(document.getElementById("root")).render(
    <div>
        <ThemeProvider theme={theme}>
            <ToastContainer />
            <RouterProvider router={router} />
        </ThemeProvider>
    </div>
);
