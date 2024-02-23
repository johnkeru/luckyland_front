import axios from 'axios';
import { notifyError, notifySuccess } from './toaster';
import useUser from '../hooks/useUser';

const HOST = 'http://localhost:8000';

export const INVENTORY_ENDPOINT = HOST + '/api/inventories?';
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
    onSuccess = () => undefined,
    setError = () => undefined,
    serverRes,
}) => {
    try {
        if (setLoading) setLoading(true);
        const response = await axiosCreate[method](endpoint, body || undefined);
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
            if (setResponse) setResponse(response.data);
            if (setCursorResponse) setCursorResponse(prev => {
                const isPrev = !prev ? [] : prev.data.data
                return {
                    ...response.data,
                    data: { ...response.data.data, data: [...isPrev, ...response.data.data.data] }
                }
            });
            if (onSuccess) onSuccess(response.data.data);
            if (handleClose) handleClose();
        } else {
            // Unsuccessful response
            if (hasToaster) notifyError({ message: response.data.message });
        }
    } catch (error) {
        console.log(error)
        // this error is for something went wrong in the server.
        if (error.response.data.field || error.response.data.message) {
            const err = error.response.data;
            if (hasToaster) {
                notifyError({ message: err.message || err.msg });
            }
            setError && setError(err.field, {
                type: 'server',
                message: err.msg,
            });
            err.message ? serverRes ? undefined : handleClose() : undefined;
            return;
        }
        // Error handling
        // this error is for input errors
        if (error) {
            // The request was made, but the server responded with an error
            if (error.response.status === 401 && useUser.getState().user) {
                // Session expired
                useUser.getState().setUser(null); // Clear user data in Zustand
                window.location.href = '/login'; // Redirect to the login page
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
