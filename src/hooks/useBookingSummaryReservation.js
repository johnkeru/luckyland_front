import { create } from 'zustand';
import { simpleFormatMonth } from '../utility_functions/formatTime';

export const reservationSteps = ['Guest Information', 'Select Dates', 'Rooms & Services', 'Confirm Booking', 'GCash Payment'];

const useBookingSummaryReservation = create((set) => ({
    reservationId: null,
    counter: 0,
    activeStep: 0,
    completed: new Array(reservationSteps.length).fill(false),
    isAlreadyReserved: false,
    customer: null,
    roomsDetail: null,
    roomSelected: null,
    cottageSelected: null,
    isCottageOvernight: null,
    roomLoading: true,
    disabledDates: [],
    amenitiesToSend: [],
    amenitiesToCompute: [],
    selectedDate: {
        checkIn: new Date(),
        checkOut: new Date(),
        duration: 0
    },
    privacyPolicy: {
        isMinimumAccepted: false,
        isPaymentWithinDay: false,
        isConfirmed: false,
    },
    setReservationId: (reservationId) => {
        set({ reservationId });
        sessionStorage.setItem('reservationId', JSON.stringify(reservationId));
    },
    setCounter: (counter) => {
        set({ counter });
    },
    setIsAlreadyReserved: (isAlreadyReserved) => {
        set({ isAlreadyReserved });
        sessionStorage.setItem('isAlreadyReserved', JSON.stringify(isAlreadyReserved));
    },
    setDisabledDates: (disabledDates) => {
        set({ disabledDates });
        sessionStorage.setItem('disabledDates', JSON.stringify(disabledDates));
    },
    setBackToSelectDate: (isReSelectRoom) => {
        sessionStorage.removeItem('roomsDetail');
        sessionStorage.removeItem('roomSelected');
        sessionStorage.removeItem('cottageSelected');
        sessionStorage.removeItem('isCottageOvernight');
        sessionStorage.removeItem('roomLoading');
        sessionStorage.removeItem('amenitiesToSend');
        sessionStorage.removeItem('amenitiesToCompute');

        const completed = [true, isReSelectRoom ? true : false, false, false];
        set({
            amenitiesToCompute: [],
            amenitiesToSend: [],
            roomsDetail: null,
            roomSelected: null,
            cottageSelected: null,
            isCottageOvernight: null,
            roomLoading: true,
            completed,
        });
        sessionStorage.setItem('completed', JSON.stringify(completed));
    },
    setAmenitiesToSend: (amenitiesToSend) => {
        set({ amenitiesToSend });
        sessionStorage.setItem('amenitiesToSend', JSON.stringify(amenitiesToSend));
    },
    setAmenitiesToCompute: (amenitiesToCompute) => {
        set({ amenitiesToCompute });
        sessionStorage.setItem('amenitiesToCompute', JSON.stringify(amenitiesToCompute));
    },
    setActiveStep: (activeStep) => {
        set({ activeStep });
        sessionStorage.setItem('activeStep', JSON.stringify(activeStep));
    },
    setCompleted: (completed) => {
        set({ completed });
        sessionStorage.setItem('completed', JSON.stringify(completed));
    },
    setCustomer: (newCustomer) => {
        set({ customer: newCustomer });
        sessionStorage.setItem('customer', JSON.stringify(newCustomer));
    },
    setRoomsDetail: (roomsDetail) => {
        set({ roomsDetail })
        sessionStorage.setItem('roomsDetail', JSON.stringify(roomsDetail));
    },
    setRoomSelected: (roomSelected) => {
        set({ roomSelected })
        sessionStorage.setItem('roomSelected', JSON.stringify(roomSelected));
    },
    setReselectRoom: () => {
        set({ roomSelected: null });
        set({ amenitiesToSend: [] })
        set({ amenitiesToCompute: [] })
        sessionStorage.removeItem('roomSelected');
        sessionStorage.removeItem('amenitiesToSend');
        sessionStorage.removeItem('amenitiesToCompute');
    },
    setCottageSelected: (cottageSelected) => {
        set({ cottageSelected })
        sessionStorage.setItem('cottageSelected', JSON.stringify(cottageSelected));
    },
    setIsCottageOvernight: (isCottageOvernight) => {
        set({ isCottageOvernight })
        sessionStorage.setItem('isCottageOvernight', JSON.stringify(isCottageOvernight));
    },
    setRoomLoading: (roomLoading) => {
        set({ roomLoading })
        sessionStorage.setItem('roomLoading', JSON.stringify(roomLoading));
    },
    setSelectedDate: (newDate) => {
        set({ selectedDate: newDate });
        sessionStorage.setItem('selectedDate', JSON.stringify(newDate));
    },
    setPrivacyPolicy: (policy) => {
        set({ privacyPolicy: policy });
        sessionStorage.setItem('privacyPolicy', JSON.stringify(policy));
    },
    resetAll: () => {
        sessionStorage.removeItem('reservationId');
        sessionStorage.removeItem('roomsDetail');
        sessionStorage.removeItem('roomSelected');
        sessionStorage.removeItem('cottageSelected');
        sessionStorage.removeItem('isCottageOvernight');
        sessionStorage.removeItem('selectedDate');
        sessionStorage.removeItem('roomLoading');
        sessionStorage.removeItem('customer');
        sessionStorage.removeItem('activeStep');
        sessionStorage.removeItem('completed');
        sessionStorage.removeItem('amenitiesToSend');
        sessionStorage.removeItem('amenitiesToCompute');
        sessionStorage.removeItem('disabledDates');
        sessionStorage.removeItem('isAlreadyReserved');
        sessionStorage.removeItem('counter');
        sessionStorage.removeItem('privacyPolicy');
        set({
            reservationId: null,
            counter: 0,
            activeStep: 0,
            couter: 0,
            completed: new Array(reservationSteps.length).fill(false),
            isAlreadyReserved: false,
            amenitiesToCompute: [],
            amenitiesToSend: [],
            disabledDates: [],
            roomsDetail: null,
            roomSelected: null,
            cottageSelected: null,
            isCottageOvernight: null,
            roomLoading: true,
            customer: null,
            selectedDate: {
                checkIn: new Date(),
                checkOut: new Date(),
                duration: 0
            },
        });
    },
}));


// Retrieve stored values from sessionStorage and set them in the store
const reservationId = JSON.parse(sessionStorage.getItem('reservationId'));
if (reservationId) {
    useBookingSummaryReservation.setState({ reservationId });
}
const counter = JSON.parse(sessionStorage.getItem('counter'));
if (counter) {
    useBookingSummaryReservation.setState({ counter });
}
const activeStep = JSON.parse(sessionStorage.getItem('activeStep'));
if (activeStep) {
    useBookingSummaryReservation.setState({ activeStep });
}
const disabledDates = JSON.parse(sessionStorage.getItem('disabledDates'));
if (disabledDates) {
    useBookingSummaryReservation.setState({ disabledDates });
}
const completed = JSON.parse(sessionStorage.getItem('completed'));
if (completed) {
    useBookingSummaryReservation.setState({ completed });
}
const roomsDetail = JSON.parse(sessionStorage.getItem('roomsDetail'));
if (roomsDetail) {
    useBookingSummaryReservation.setState({ roomsDetail });
}
const roomSelected = JSON.parse(sessionStorage.getItem('roomSelected'));
if (roomSelected) {
    useBookingSummaryReservation.setState({ roomSelected });
}
const cottageSelected = JSON.parse(sessionStorage.getItem('cottageSelected'));
if (cottageSelected) {
    useBookingSummaryReservation.setState({ cottageSelected });
}

const amenitiesToCompute = JSON.parse(sessionStorage.getItem('amenitiesToCompute'));
if (amenitiesToCompute) {
    useBookingSummaryReservation.setState({ amenitiesToCompute });
}

const amenitiesToSend = JSON.parse(sessionStorage.getItem('amenitiesToSend'));
if (amenitiesToSend) {
    useBookingSummaryReservation.setState({ amenitiesToSend });
}

const isCottageOvernight = JSON.parse(sessionStorage.getItem('isCottageOvernight'));
if (isCottageOvernight) {
    useBookingSummaryReservation.setState({ isCottageOvernight });
}
const roomLoading = JSON.parse(sessionStorage.getItem('roomLoading'));
if (roomLoading) {
    useBookingSummaryReservation.setState({ roomLoading });
}

const selectedDate = JSON.parse(sessionStorage.getItem('selectedDate'));
if (selectedDate) {
    useBookingSummaryReservation.setState({ selectedDate });
}

const customer = JSON.parse(sessionStorage.getItem('customer'));
if (customer) {
    useBookingSummaryReservation.setState({ customer });
}

const privacyPolicy = JSON.parse(sessionStorage.getItem('privacyPolicy'));
if (privacyPolicy) {
    useBookingSummaryReservation.setState({ privacyPolicy });
}

export default useBookingSummaryReservation;
