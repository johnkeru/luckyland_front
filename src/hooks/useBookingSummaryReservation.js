import { create } from 'zustand';
import { simpleFormatMonth } from '../utility_functions/formatTime';

const useBookingSummaryReservation = create((set) => ({
    customer: null,
    selectedDate: {
        checkIn: simpleFormatMonth(new Date()),
        checkOut: simpleFormatMonth(new Date()),
        duration: 0
    },
    selectedRoom: null,
    numberOfGuest: {
        adult: 1,
        children: 0,
        seniors: 0,
    },
    privacyPolicy: {
        isMinimumAccepted: false,
        isPaymentWithinDay: false,
        isConfirmed: false,
    },
    setCustomer: (newCustomer) => {
        set({ customer: newCustomer });
        localStorage.setItem('customer', JSON.stringify(newCustomer));
    },
    setSelectedRoom: (room) => {
        localStorage.setItem('selectedRoom', JSON.stringify(room));
    },
    setNumberOfGuest: (info) => {
        set({ numberOfGuest: info });
        localStorage.setItem('numberOfGuest', JSON.stringify(info));
    },
    setSelectedDate: (newDate) => {
        set({ selectedDate: newDate });
        localStorage.setItem('selectedDate', JSON.stringify(newDate));
    },
    removeSelectedRoom: () => {
        localStorage.removeItem('selectedRoom');
        localStorage.removeItem('selectedDate');
    },
    setPrivacyPolicy: (policy) => {
        set({ privacyPolicy: policy });
        localStorage.setItem('privacyPolicy', JSON.stringify(policy));
    },
    resetAll: () => {
        localStorage.removeItem('selectedRoom');
        localStorage.removeItem('selectedDate');
        localStorage.removeItem('customer');
        localStorage.removeItem('numberOfGuest');
        // localStorage.removeItem('privacyPolicy');
        set({
            selectedRoom: null,
            customer: null,
            selectedDate: {
                checkIn: simpleFormatMonth(new Date()),
                checkOut: simpleFormatMonth(new Date()),
                duration: 0
            },
            numberOfGuest: {
                adult: 1,
                children: 0,
                seniors: 0,
            },
            privacyPolicy: {
                isMinimumAccepted: false,
                isPaymentWithinDay: false,
                isConfirmed: false,
            },
        });
    },
}));

// Retrieve stored values from localStorage and set them in the store
const storedRoom = JSON.parse(localStorage.getItem('selectedRoom'));
if (storedRoom) {
    useBookingSummaryReservation.setState({ selectedRoom: storedRoom });
}

const storedDate = JSON.parse(localStorage.getItem('selectedDate'));
if (storedDate) {
    useBookingSummaryReservation.setState({ selectedDate: storedDate });
}

const storedCustomer = JSON.parse(localStorage.getItem('customer'));
if (storedCustomer) {
    useBookingSummaryReservation.setState({ customer: storedCustomer });
}

const storedGuestInfo = JSON.parse(localStorage.getItem('numberOfGuest'));
if (storedGuestInfo) {
    useBookingSummaryReservation.setState({ numberOfGuest: storedGuestInfo });
}

const storedPrivacyPolicy = JSON.parse(localStorage.getItem('privacyPolicy'));
if (storedPrivacyPolicy) {
    useBookingSummaryReservation.setState({ privacyPolicy: storedPrivacyPolicy });
}

export default useBookingSummaryReservation;
