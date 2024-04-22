import axios from "axios";
import useUser from "../../hooks/useUser";
import commonValidationCall from './commonValidationCall';


const isProduction = import.meta.env.VITE_IS_PRODUCTION;
const HOST = isProduction ? import.meta.env.VITE_PRODUCTION_HOST : 'http://localhost:8000';

export const RESERVATION_ENDPOINT = HOST + '/api/reservations?';
export const INVENTORY_ENDPOINT = HOST + '/api/inventories?';
export const DELIVERY_ENDPOINT = HOST + '/api/deliveries?';
export const WASTE_ENDPOINT = HOST + '/api/wastes?';
export const UNAVAILABLE_ENDPOINT = HOST + '/api/unavailables?';
export const EMPLOYEE_ENDPOINT = HOST + '/api/employees?';

export const CUSTOMER_RECORDS_ENDPOINT = HOST + '/api/customer-records?';
export const BACKUP_ENDPOINT = HOST + '/api/backups';

export const csrf = async () => await axios.get(HOST + '/sanctum/csrf-cookie', { withCredentials: true });

export const axiosCreate = axios.create({
    baseURL: HOST,
    withCredentials: true,
    withXSRFToken: true,
});

export const sessionExpiredRedirect = (error) => {
    console.log(error)
    if (error.response.status === 401 && useUser.getState().user) {
        commonValidationCall({ endpoint: '/logout', method: 'post', });
        useUser.getState().setUser(null); // Clear user data in Zustand
        window.location.href = '/'; // Redirect to the login page
    }
}