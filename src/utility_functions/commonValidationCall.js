// this common validation is where the server will return an custom error and success response.
// custom request validation error field is 'msg'. while response error is message. 

import { axiosCreate, sessionExpiredRedirect } from '../utility_functions/axiosCalls/config.js';
import {notifySuccess, notifyError} from "./toaster.js";


const commonValidationCall = async ({
    endpoint,
    method = 'get',
    hasToaster = false,
    body = null,
    setResponse = () => undefined,
    setLoading = () => undefined,
    handleClose = () => undefined,
    setError = () => undefined,
    onSuccess = () => undefined,
    setDataDirectly = () => undefined,
    toasterDelay = 0,
    setConflict, // only for confirming reservation @ OverallBookingSummary
}) => {
    try {
        if (setLoading) setLoading(true);
        const response = await axiosCreate[method](endpoint, body || undefined);
        console.log(response)
        if (onSuccess) onSuccess();
        if (setDataDirectly) setDataDirectly(response.data?.data);
        if (setResponse) setResponse(response.data);
        if (hasToaster) notifySuccess({ message: response.data.message, duration: toasterDelay });
        if (handleClose) handleClose();

    } catch (error) {
        console.log(error);
        sessionExpiredRedirect(error);
        const statusCode = error.response.status;
        if (statusCode >= 400) {                                    // hereeeeeeeeeeeeee
            if (error.response.data?.msg) {    // used in change password and reset input.
                if (setError) {
                    setError(errResponse.data.field, {
                        type: 'server',
                        message: errResponse.data.msg,
                    });
                }
            } else {
                if (hasToaster) notifyError({ message: error.response.data.message });
                if (setConflict) setConflict(error.response.data);
            }
        }

        const errResponse = error?.response;
        if (errResponse?.message) {
            hasToaster && notifyError({ message: errResponse.message });
        }
        if (errResponse?.data.errors) {
            if (errResponse?.data?.errors?.length !== 0) {
                // used in login input.
                const isObject = typeof (errResponse?.data?.errors) === 'object';
                if (isObject) {
                    const errors = errResponse.data.errors;
                    if (typeof errors === 'object') {
                        const errKey = Object.keys(errors)[0];
                        setError(errKey, {
                            type: 'server',
                            message: errors[errKey][0],
                        });
                    }
                }
                // used in step 1 input.
                const err = errResponse?.data?.errors[0];
                if (setError) {
                    setError(err.field, {
                        type: 'server',
                        message: err.msg,
                    });
                }
            }
        }
    } finally {
        if (setLoading) setLoading(false);
    }
};


export default commonValidationCall;
