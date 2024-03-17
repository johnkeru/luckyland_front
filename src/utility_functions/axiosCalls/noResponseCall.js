// this common validation is where the server will return an custom error and success response.

import { notifySuccess, notifyError } from '../toaster';
import { axiosCreate, sessionExpiredRedirect } from './config';


const noResponseCall = async ({
    endpoint,
    method = 'get',
    hasToaster = false,
    body = null,
    setLoading = () => undefined,
    onSuccess = () => undefined,
}) => {
    try {

        if (setLoading) setLoading(true);

        const response = await axiosCreate[method](endpoint, body || undefined);

        if (!response?.data?.success) {
            if (hasToaster) notifyError({ message: response.data.message });
        }

        if (onSuccess) onSuccess();
        if (hasToaster) notifySuccess({ message: response.data.message });

    } catch (error) {

        sessionExpiredRedirect(error);

        console.log(error);

    } finally {
        if (setLoading) setLoading(false);
    }
};


export default noResponseCall;
