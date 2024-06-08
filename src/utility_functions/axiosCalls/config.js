import axios from "axios";
import useUser from "../../hooks/useUser";
import commonValidationCall from './commonValidationCall';
import { notifyError } from "../toaster";

export const ISPRODUCTION = Boolean(import.meta.env.VITE_PRODUCTION_HOST);

const HOST = ISPRODUCTION ? import.meta.env.VITE_PRODUCTION_HOST : 'http://localhost:8000';

// Main API endpoints
export const RESERVATION_ENDPOINT = HOST + '/api/reservations';
export const INVENTORY_ENDPOINT = HOST + '/api/inventories';
export const DELIVERY_ENDPOINT = HOST + '/api/deliveries';
export const WASTE_ENDPOINT = HOST + '/api/wastes';
export const UNAVAILABLE_ENDPOINT = HOST + '/api/unavailables';
export const EMPLOYEE_ENDPOINT = HOST + '/api/employees';
export const CUSTOMER_RECORDS_ENDPOINT = HOST + '/api/customer-records';
export const BACKUP_ENDPOINT = HOST + '/api/backups';

export const axiosCreate = axios.create({
    baseURL: HOST,
    headers: {
        Accept: 'application/json',
    }
});

axiosCreate.interceptors.request.use(
    config => {
        const token = useUser.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export const sessionExpiredRedirect = error => {
    // console.log(error);
    if (error.response && error.response.status === 401 && useUser.getState().user) {
        commonValidationCall({ endpoint: 'api/logout', method: 'post' });
        useUser.getState().setUser(null); // Clear user data in Zustand
        useUser.getState().setToken(null); // Clear token in Zustand
        notifyError({ message: 'Your session has expired. Please log in again to continue.' })
        window.location.href = '/'; // Redirect to the login page
    }
};
