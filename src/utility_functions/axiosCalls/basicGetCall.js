import { notifyError, notifySuccess } from '../toaster';
import { axiosCreate, sessionExpiredRedirect } from './config';


const basicGetCall = async ({
    endpoint,
    method = 'get',
    body = null,
    setResponse = () => undefined,
    setLoading = () => undefined,
    setDataDirectly = () => undefined,
    onSuccess = () => undefined,
    hasToaster,
    toasterDelay = 2000
}) => {
    try {
        if (setLoading) setLoading(true);
        const response = await axiosCreate[method](endpoint, body || undefined);
        if (hasToaster) notifySuccess({ message: response?.data.message, duration: toasterDelay });
        if (setDataDirectly) setDataDirectly(response.data?.data);
        if (onSuccess) onSuccess();
        if (setResponse) setResponse(response.data);

    } catch (error) {
        sessionExpiredRedirect(error);
        const statusCode = error.response.status;
        if (statusCode >= 400) {                                    // hereeeeeeeeeeeeee
            if (hasToaster) notifyError({ message: error.response.data.message });
        }
    } finally {
        if (setLoading) setLoading(false);
    }
};


export default basicGetCall;


