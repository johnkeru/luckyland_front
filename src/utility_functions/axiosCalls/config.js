import axios from "axios";

const HOST = 'http://localhost:8000';

export const INVENTORY_ENDPOINT = HOST + '/api/inventories?';
export const DELIVERY_ENDPOINT = HOST + '/api/deliveries?';
export const WASTE_ENDPOINT = HOST + '/api/wastes?';
export const UNAVAILABLE_ENDPOINT = HOST + '/api/unavailables?';
export const EMPLOYEE_ENDPOINT = HOST + '/api/employees?';

export const csrf = async () => await axios.get(HOST + '/sanctum/csrf-cookie', { withCredentials: true });

export const axiosCreate = axios.create({
    baseURL: HOST,
    withCredentials: true
});
