import axios from 'axios';
import { notifyError, notifySuccess } from './toaster';
import useUser from '../hooks/useUser';

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

const axiosCall = async ({
    endpoint,
    method = 'get',
    hasToaster = false,
    body = null,
    setResponse = () => undefined,
    setCursorResponse = () => undefined,
    setLoading = () => undefined,
    handleClose = () => undefined,
    setError = () => undefined,
    setDataDirectly = () => undefined,
    serverRes,
    onSuccess,
}) => {
    try {
        if (setLoading) setLoading(true);
        const response = await axiosCreate[method](endpoint, body || undefined);
        // this one is for response: ['success' => false, 'message' => 'Invalid quantity.'];
        if (!response.data.success) {
            if (hasToaster) {
                notifyError({ message: response.data.message });
                // return;
            }
        }
        if (response.status < 300) {
            if (response.data?.status && serverRes) {
                if (hasToaster) {
                    notifySuccess({ message: response.data.status, duration: 5000 });
                    handleClose();
                    return;
                }
            }
            // Successful response
            if (hasToaster) notifySuccess({ message: response.data.message });
            if (onSuccess) onSuccess();
            if (setResponse) setResponse(response.data);
            if (setDataDirectly) setDataDirectly(response.data?.data); // the server response is {data: {data: actual data, ...}}
            if (setCursorResponse) setCursorResponse(prev => {
                const isPrev = !prev ? [] : prev.data
                return {
                    ...response.data,
                    data: [...isPrev, ...response.data.data]
                }
            });

            if (handleClose) handleClose();
        } else {
            // Unsuccessful response
            if (hasToaster) notifyError({ message: response.data.message });
        }
    } catch (error) {
        console.log(error)
        // this error is for inputs but the validation on server didn't allowed.
        if (error.response?.data?.field || error.response?.data?.message) {
            const err = error.response.data;
            if (hasToaster) {
                notifyError({ message: err.message || err.msg });
            }
            setError && setError(err.field, {
                type: 'server',
                message: err.msg,
            });
            err.message ? serverRes ? undefined : handleClose() : undefined;
        }
        // this error is for inputs errors
        if (error) {
            if (error?.response?.data.status === 429) {
                notifyError({ message: error?.response?.data.statusText, duration: 5000 });
                return;
            }
            // The request was made, but the server responded with an error
            if (error.response.status === 401 && useUser.getState().user) {
                useUser.getState().setUser(null); // Clear user data in Zustand
                window.location.href = '/'; // Redirect to the login page
            } else if (error.response.status === 404) {
                hasToaster && notifyError({ message: 'Not found!' });
            } else if (error.response.status === 422) {
                const errors = error.response.data.errors;
                // for login error
                if (typeof errors === 'object') {
                    const errKey = Object.keys(errors)[0];
                    setError(errKey, {
                        type: 'server',
                        message: errors[errKey][0],
                    });
                }
                // for common inputs error
                if (Array.isArray(errors)) {
                    errors.map(err => {
                        setError(err.field, {
                            type: 'server',
                            message: err.msg,
                        });
                    });
                } // i want to know if array or list
                if (error.response.data.errors.length !== 0) {
                    hasToaster && notifyError({ message: error.response.data.errors[0].msg });
                } else {
                    hasToaster && notifyError({ message: error.response.data.message });
                }
            }
        } else if (error.request) {
            // The request was made but no response was received
            hasToaster && notifyError({ message: 'No response received from the server' });
        } else {
            // Something happened in setting up the request that triggered an error
            hasToaster && notifyError({ message: 'Error setting up the request' });
        }
    } finally {
        if (setLoading) setLoading(false);
    }
};


export default axiosCall;
