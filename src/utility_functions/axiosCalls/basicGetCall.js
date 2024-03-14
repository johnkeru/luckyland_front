import { notifyError } from '../toaster';
import { axiosCreate } from './config';


const basicGetCall = async ({
    endpoint,
    method = 'get',
    body = null,
    setResponse = () => undefined,
    setLoading = () => undefined,
    setDataDirectly = () => undefined,
    onSuccess = () => undefined,
    hasToaster,
}) => {
    try {

        if (setLoading) setLoading(true);

        const response = await axiosCreate[method](endpoint, body || undefined);

        if (!response?.data.success) {
            if (hasToaster) notifyError({ message: response.data.message });
        }

        if (setDataDirectly) setDataDirectly(response.data?.data);
        if (onSuccess) onSuccess();
        if (setResponse) setResponse(response.data);

    } catch (error) {

        console.log(error);

    } finally {
        if (setLoading) setLoading(false);
    }
};


export default basicGetCall;
