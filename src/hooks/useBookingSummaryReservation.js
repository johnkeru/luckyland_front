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
        localStorage.setItem('reservationId', JSON.stringify(reservationId));
    },
    setCounter: (counter) => {
        set({ counter });
    },
    setIsAlreadyReserved: (isAlreadyReserved) => {
        set({ isAlreadyReserved });
        localStorage.setItem('isAlreadyReserved', JSON.stringify(isAlreadyReserved));
    },
    setDisabledDates: (disabledDates) => {
        set({ disabledDates });
        localStorage.setItem('disabledDates', JSON.stringify(disabledDates));
    },
    setBackToSelectDate: (isReSelectRoom) => {    // in this case we should also add setBackToSelectRoom but this function does it as well.
        localStorage.removeItem('roomsDetail');
        localStorage.removeItem('roomSelected');
        localStorage.removeItem('cottageSelected');
        localStorage.removeItem('isCottageOvernight');
        localStorage.removeItem('roomLoading');
        localStorage.removeItem('amenitiesToSend');
        localStorage.removeItem('amenitiesToCompute');
        // !isReSelectRoom ? localStorage.removeItem('selectedDate') : undefined
        // !isReSelectRoom ? set({
        //     selectedDate: {
        //         checkIn: simpleFormatMonth(new Date()),
        //         checkOut: simpleFormatMonth(new Date()),
        //         duration: 0
        //     }
        // }) : undefined;

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
        localStorage.setItem('completed', JSON.stringify(completed));

    },
    setAmenitiesToSend: (amenitiesToSend) => {
        set({ amenitiesToSend });
        localStorage.setItem('amenitiesToSend', JSON.stringify(amenitiesToSend));
    },
    setAmenitiesToCompute: (amenitiesToCompute) => {
        set({ amenitiesToCompute });
        localStorage.setItem('amenitiesToCompute', JSON.stringify(amenitiesToCompute));
    },
    setActiveStep: (activeStep) => {
        set({ activeStep });
        localStorage.setItem('activeStep', JSON.stringify(activeStep));
    },
    setCompleted: (completed) => {
        set({ completed });
        localStorage.setItem('completed', JSON.stringify(completed));
    },
    setCustomer: (newCustomer) => {
        set({ customer: newCustomer });
        localStorage.setItem('customer', JSON.stringify(newCustomer));
    },
    setRoomsDetail: (roomsDetail) => {
        set({ roomsDetail })
        localStorage.setItem('roomsDetail', JSON.stringify(roomsDetail));
    },
    setRoomSelected: (roomSelected) => {
        set({ roomSelected })
        localStorage.setItem('roomSelected', JSON.stringify(roomSelected));
    },
    setReselectRoom: () => {
        set({ roomSelected: null });
        set({ amenitiesToSend: [] })
        set({ amenitiesToCompute: [] })
        localStorage.removeItem('roomSelected');
        localStorage.removeItem('amenitiesToSend');
        localStorage.removeItem('amenitiesToCompute');
    },
    setCottageSelected: (cottageSelected) => {
        set({ cottageSelected })
        localStorage.setItem('cottageSelected', JSON.stringify(cottageSelected));
    },
    setIsCottageOvernight: (isCottageOvernight) => {
        set({ isCottageOvernight })
        localStorage.setItem('isCottageOvernight', JSON.stringify(isCottageOvernight));
    },
    setRoomLoading: (roomLoading) => {
        set({ roomLoading })
        localStorage.setItem('roomLoading', JSON.stringify(roomLoading));
    },
    setSelectedDate: (newDate) => {
        set({ selectedDate: newDate });
        localStorage.setItem('selectedDate', JSON.stringify(newDate));
    },
    setPrivacyPolicy: (policy) => {
        set({ privacyPolicy: policy });
        localStorage.setItem('privacyPolicy', JSON.stringify(policy));
    },
    resetAll: () => {
        localStorage.removeItem('reservationId');
        localStorage.removeItem('roomsDetail');
        localStorage.removeItem('roomSelected');
        localStorage.removeItem('cottageSelected');
        localStorage.removeItem('isCottageOvernight');
        localStorage.removeItem('selectedDate');
        localStorage.removeItem('roomLoading');
        localStorage.removeItem('customer');
        localStorage.removeItem('activeStep');
        localStorage.removeItem('completed');
        localStorage.removeItem('amenitiesToSend');
        localStorage.removeItem('amenitiesToCompute');
        localStorage.removeItem('disabledDates');
        localStorage.removeItem('isAlreadyReserved');
        localStorage.removeItem('counter');
        localStorage.removeItem('privacyPolicy');
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


// Retrieve stored values from localStorage and set them in the store
const reservationId = JSON.parse(localStorage.getItem('reservationId'));
if (reservationId) {
    useBookingSummaryReservation.setState({ reservationId });
}
const counter = JSON.parse(localStorage.getItem('counter'));
if (counter) {
    useBookingSummaryReservation.setState({ counter });
}
const activeStep = JSON.parse(localStorage.getItem('activeStep'));
if (activeStep) {
    useBookingSummaryReservation.setState({ activeStep });
}
const disabledDates = JSON.parse(localStorage.getItem('disabledDates'));
if (disabledDates) {
    useBookingSummaryReservation.setState({ disabledDates });
}
const completed = JSON.parse(localStorage.getItem('completed'));
if (completed) {
    useBookingSummaryReservation.setState({ completed });
}
const roomsDetail = JSON.parse(localStorage.getItem('roomsDetail'));
if (roomsDetail) {
    useBookingSummaryReservation.setState({ roomsDetail });
}
const roomSelected = JSON.parse(localStorage.getItem('roomSelected'));
if (roomSelected) {
    useBookingSummaryReservation.setState({ roomSelected });
}
const cottageSelected = JSON.parse(localStorage.getItem('cottageSelected'));
if (cottageSelected) {
    useBookingSummaryReservation.setState({ cottageSelected });
}

const amenitiesToCompute = JSON.parse(localStorage.getItem('amenitiesToCompute'));
if (amenitiesToCompute) {
    useBookingSummaryReservation.setState({ amenitiesToCompute });
}

const amenitiesToSend = JSON.parse(localStorage.getItem('amenitiesToSend'));
if (amenitiesToSend) {
    useBookingSummaryReservation.setState({ amenitiesToSend });
}

const isCottageOvernight = JSON.parse(localStorage.getItem('isCottageOvernight'));
if (isCottageOvernight) {
    useBookingSummaryReservation.setState({ isCottageOvernight });
}
const roomLoading = JSON.parse(localStorage.getItem('roomLoading'));
if (roomLoading) {
    useBookingSummaryReservation.setState({ roomLoading });
}

const selectedDate = JSON.parse(localStorage.getItem('selectedDate'));
if (selectedDate) {
    useBookingSummaryReservation.setState({ selectedDate });
}

const customer = JSON.parse(localStorage.getItem('customer'));
if (customer) {
    useBookingSummaryReservation.setState({ customer });
}

const privacyPolicy = JSON.parse(localStorage.getItem('privacyPolicy'));
if (privacyPolicy) {
    useBookingSummaryReservation.setState({ privacyPolicy });
}

export default useBookingSummaryReservation;
