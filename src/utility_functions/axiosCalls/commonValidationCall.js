// this common validation is where the server will return an custom error and success response.
// custom request validation error field is 'msg'. while response error is message. 

import { notifyError, notifySuccess } from '../toaster';
import { axiosCreate, sessionExpiredRedirect } from './config';


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
        console.log(response);

        if (onSuccess) onSuccess();
        if (setDataDirectly) setDataDirectly(response.data?.data);
        if (setResponse) setResponse(response.data);
        if (hasToaster) notifySuccess({ message: response.data.message, duration: toasterDelay });
        if (handleClose) handleClose();

    } catch (error) {
        console.log(error);
        sessionExpiredRedirect(error);

        if (error.response) {
            const statusCode = error.response.status;
            const errResponse = error.response;

            if (statusCode >= 400) {
                if (hasToaster) notifyError({ message: errResponse.data.message });
                if (setConflict) setConflict(errResponse.data); // use only for confirming booking.
                if (setError) {
                    setError(errResponse.data.field, {
                        type: 'server',
                        message: errResponse.data.message,
                    });
                }
            }

            // for input array errors
            if (errResponse?.data.errors && errResponse.data.errors.length !== 0) {
                errResponse.data.errors.forEach(error => {
                    if (setError) {
                        setError(error.field, {
                            type: 'server',
                            message: error.msg,
                        });
                    }
                });
            }
        }

    } finally {
        if (setLoading) setLoading(false);
    }
};


export default commonValidationCall;
