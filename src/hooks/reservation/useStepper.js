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
        localStorage.setItem('activeStep', JSON.stringify(activeStep));
    },
    setCompleted: (completed) => {
        set({ completed });
        localStorage.setItem('completed', JSON.stringify(completed));
    },
    setPrivacyPolicy: (privacyPolicy) => {
        set({ privacyPolicy });
        localStorage.setItem('privacyPolicy', JSON.stringify(privacyPolicy));
    },
    resetStepper: () => {
        localStorage.removeItem('activeStep');
        localStorage.removeItem('completed');
        localStorage.removeItem('privacyPolicy');
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


const activeStep = JSON.parse(localStorage.getItem('activeStep'));
if (activeStep) {
    useStepper.setState({ activeStep });
}
const completed = JSON.parse(localStorage.getItem('completed'));
if (completed) {
    useStepper.setState({ completed });
}
const privacyPolicy = JSON.parse(localStorage.getItem('privacyPolicy'));
if (privacyPolicy) {
    useStepper.setState({ privacyPolicy });
}

export default useStepper;
