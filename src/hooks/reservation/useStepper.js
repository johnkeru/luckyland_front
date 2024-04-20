import { create } from 'zustand';

export const reservationSteps = ['Guest Information', 'Select Dates', 'Rooms & Services', 'Confirm Booking', 'GCash Payment'];

const useStepper = create((set) => ({
    activeStep: JSON.parse(sessionStorage.getItem('activeStep')) || 0,
    completed: JSON.parse(sessionStorage.getItem('completed')) || new Array(reservationSteps.length).fill(false),
    privacyPolicy: JSON.parse(sessionStorage.getItem('privacyPolicy')) || {
        isMinimumAccepted: false,
        isPaymentWithinDay: false,
        isConfirmed: false,
    },
    setActiveStep: (activeStep) => {
        set({ activeStep });
        sessionStorage.setItem('activeStep', JSON.stringify(activeStep));
    },
    setCompleted: (completed) => {
        set({ completed });
        sessionStorage.setItem('completed', JSON.stringify(completed));
    },
    setPrivacyPolicy: (privacyPolicy) => {
        set({ privacyPolicy });
        sessionStorage.setItem('privacyPolicy', JSON.stringify(privacyPolicy));
    },
    resetStepper: () => {
        sessionStorage.removeItem('activeStep');
        sessionStorage.removeItem('completed');
        sessionStorage.removeItem('privacyPolicy');
        set({
            activeStep: 0,
            completed: new Array(reservationSteps.length).fill(false),
            privacyPolicy: {
                isMinimumAccepted: false,
                isPaymentWithinDay: false,
                isConfirmed: false,
            }
        });
    },
}));

export default useStepper;
