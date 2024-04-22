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

    const disabledDates = [];
    const selectedDate = defaultSelectedDate;

    return {
        disabledDates,
        selectedDate,

        setDisabledDates: (disabledDates) => {
            set({ disabledDates });
            sessionStorage.setItem('disabledDates', JSON.stringify(disabledDates));
        },
        setSelectedDate: (newDate) => {
            set({ selectedDate: newDate });
            sessionStorage.setItem('selectedDate', JSON.stringify(newDate));
        },
        setResetSelectedDate: () => {
            set({ selectedDate: defaultSelectedDate });
            sessionStorage.removeItem('selectedDate');
        },
        resetDate: () => {
            sessionStorage.removeItem('selectedDate');
            sessionStorage.removeItem('disabledDates');
            set({
                disabledDates: [],
                selectedDate: defaultSelectedDate,
            });
        },
    };
});

const disabledDates = JSON.parse(sessionStorage.getItem('disabledDates'));
if (disabledDates) {
    useDate.setState({ disabledDates });
}
const selectedDate = JSON.parse(sessionStorage.getItem('selectedDate'));
if (selectedDate) {
    useDate.setState({ selectedDate });
}

export default useDate;
