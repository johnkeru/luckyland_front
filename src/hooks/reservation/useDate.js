import { create } from 'zustand';

export const reservationSteps = ['Guest Information', 'Select Dates', 'Rooms & Services', 'Confirm Booking', 'GCash Payment'];

const useDate = create((set) => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    // Set checkIn to today and checkOut to tomorrow by default
    const defaultCheckIn = new Date();
    const defaultCheckOut = new Date(currentDate);

    // Check if it's past 2 PM
    if (currentHour >= 14) {
        // Set checkIn to tomorrow
        defaultCheckIn.setDate(currentDate.getDate() + 1);
        // Set checkOut to the day after tomorrow
        defaultCheckOut.setDate(currentDate.getDate() + 2);
    } else {
        // If it's before 2 PM, set checkOut to tomorrow
        defaultCheckOut.setDate(currentDate.getDate() + 1);
    }

    const defaultSelectedDate = {
        checkIn: defaultCheckIn,
        checkOut: defaultCheckOut,
        duration: 1
    };

    const disabledDates = JSON.parse(localStorage.getItem('disabledDates')) || [];
    const selectedDate = JSON.parse(localStorage.getItem('selectedDate')) || defaultSelectedDate;

    return {
        disabledDates,
        selectedDate,

        setDisabledDates: (disabledDates) => {
            set({ disabledDates });
            localStorage.setItem('disabledDates', JSON.stringify(disabledDates));
        },
        setSelectedDate: (newDate) => {
            set({ selectedDate: newDate });
            localStorage.setItem('selectedDate', JSON.stringify(newDate));
        },
        setResetSelectedDate: () => {
            set({ selectedDate: defaultSelectedDate });
            localStorage.removeItem('selectedDate');
        },
        resetDate: () => {
            localStorage.removeItem('selectedDate');
            localStorage.removeItem('disabledDates');
            set({
                disabledDates: [],
                selectedDate: defaultSelectedDate,
            });
        },
    };
});

const disabledDates = JSON.parse(localStorage.getItem('disabledDates'));
if (disabledDates) {
    useDate.setState({ disabledDates });
}
const selectedDate = JSON.parse(localStorage.getItem('selectedDate'));
if (selectedDate) {
    useDate.setState({ selectedDate });
}

export default useDate;
