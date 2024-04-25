import { create } from 'zustand';

export const reservationSteps = ['Guest Information', 'Select Dates', 'Rooms & Services', 'Confirm Booking', 'GCash Payment'];

const useStepper = create((set) => ({
    activeStep: 0,
    completed: new Array(reservationSteps.length).fill(false),
    privacyPolicy: {
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
    setResetCompleted: () => {
        sessionStorage.removeItem('completed');
        set({
            completed: new Array(reservationSteps.length).fill(false),
        })
    },
    setPrivacyPolicy: (privacyPolicy) => {
        set({ privacyPolicy });
        sessionStorage.setItem('privacyPolicy', JSON.stringify(privacyPolicy));
    },
    resetSteps: () => {
        sessionStorage.removeItem('activeStep');
        sessionStorage.removeItem('completed');
        set({
            activeStep: 0,
            completed: new Array(reservationSteps.length).fill(false),
        });
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

const activeStep = JSON.parse(sessionStorage.getItem('activeStep'));
if (activeStep) {
    useStepper.setState({ activeStep });
}

const completed = JSON.parse(sessionStorage.getItem('completed'));
if (completed) {
    useStepper.setState({ completed });
}

const privacyPolicy = JSON.parse(sessionStorage.getItem('privacyPolicy'));
if (privacyPolicy) {
    useStepper.setState({ privacyPolicy });
}

export default useStepper;
