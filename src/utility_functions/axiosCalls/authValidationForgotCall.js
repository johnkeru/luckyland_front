import { notifyError, notifySuccess } from '../toaster';
import { axiosCreate } from './config';


const authValidationForgotCall = async ({
    endpoint,
    method = 'get',
    hasToaster = false,
    body = null,
    setLoading = () => undefined,
    handleClose = () => undefined,
    setError = () => undefined,
    onSuccess = () => undefined,
}) => {
    try {

        if (setLoading) setLoading(true);

        const response = await axiosCreate[method](endpoint, body || undefined);

        if (response.data?.status) {
            if (hasToaster) {
                notifySuccess({ message: response.data.status, duration: 5000 });
                handleClose();
                return;
            }
        }

        if (onSuccess) onSuccess();
        if (hasToaster) notifySuccess({ message: response.data.message });
        if (handleClose) handleClose();


    } catch (error) {

        console.log(error);

        const errResponse = error?.response;

        if (errResponse) {
            const errMessage = errResponse?.data.message;
            if (hasToaster) {
                notifyError({ message: errMessage, duration: 5000 });
            }
            if (setError) {
                setError('email', {
                    type: 'server',
                    message: errMessage,
                });
            }
        }

    } finally {
        if (setLoading) setLoading(false);
    }
};


export default authValidationForgotCall;
