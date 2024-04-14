import { toast } from 'react-toastify';

export const notifySuccess = ({ message, duration = 1000 }) => {
    if (!toast.isActive('success-toast')) {
        toast.success(message, {
            toastId: 'success-toast', // Set a specific ID for the success toast,
            hideProgressBar: true,
            autoClose: duration,
            pauseOnHover: true
        });
    }
};

export const notifyError = ({ message, duration = 1000 }) => {
    if (!toast.isActive('error-toast')) {
        toast.error(message, {
            toastId: 'error-toast', // Set a specific ID for the error toast,
            hideProgressBar: true,
            autoClose: duration,
            pauseOnHover: true
        });
    }
};