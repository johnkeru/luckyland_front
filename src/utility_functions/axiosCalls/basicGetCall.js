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
        if (hasToaster) {
            notifySuccess({ message: response?.data.message, duration: toasterDelay });
        }
        if (!response?.data.success) {
            if (hasToaster) notifyError({ message: response.data.message });
        }

        if (setDataDirectly) setDataDirectly(response.data?.data);
        if (
            (response?.data?.success && onSuccess) ||
            response.status === 204 // use for login
        ) onSuccess();
        if (setResponse) setResponse(response.data);

    } catch (error) {
        sessionExpiredRedirect(error);
        console.log(error);

    } finally {
        if (setLoading) setLoading(false);
    }
};


export default basicGetCall;
