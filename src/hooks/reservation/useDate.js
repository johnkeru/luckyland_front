import { create } from 'zustand';

export const reservationSteps = ['Guest Information', 'Select Dates', 'Rooms & Services', 'Confirm Booking', 'GCash Payment'];

const useDate = create((set) => ({
    disabledDates: [],
    selectedDate: {
        checkIn: new Date(),
        checkOut: new Date(),
        duration: 0
    },

    setDisabledDates: (disabledDates) => {
        set({ disabledDates });
        localStorage.setItem('disabledDates', JSON.stringify(disabledDates));
    },
    setSelectedDate: (newDate) => {
        set({ selectedDate: newDate });
        localStorage.setItem('selectedDate', JSON.stringify(newDate));
    },
    resetDate: () => {
        localStorage.removeItem('selectedDate');
        localStorage.removeItem('disabledDates');
        set({
            disabledDates: [],
            selectedDate: {
                checkIn: new Date(),
                checkOut: new Date(),
                duration: 0
            },
        });
    },
}));


const disabledDates = JSON.parse(localStorage.getItem('disabledDates'));
if (disabledDates) {
    useDate.setState({ disabledDates });
}
const selectedDate = JSON.parse(localStorage.getItem('selectedDate'));
if (selectedDate) {
    useDate.setState({ selectedDate });
}

export default useDate;
