import { axiosCreate, sessionExpiredRedirect } from './config';


const paginationCall = async ({
    endpoint,
    method = 'get',
    hasToaster = false,
    body = null,
    setLoading = () => undefined,
    setCursorResponse = () => undefined,
}) => {
    try {
        if (setLoading) setLoading(true);
        const response = await axiosCreate[method](endpoint, body || undefined);
        if (response.statusText == 'OK') {
            if (setCursorResponse) setCursorResponse(prev => {
                const isPrev = !prev ? [] : prev.data
                return {
                    ...response.data,
                    data: [...isPrev, ...response.data.data]
                }
            });
        } else {
            if (hasToaster) notifyError({ message: response.data.message });
        }
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


export default paginationCall;
