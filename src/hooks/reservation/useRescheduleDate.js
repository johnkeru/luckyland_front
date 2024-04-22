import { create } from 'zustand';

const useRescheduleDate = create((set) => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    const defaultCheckIn = new Date();
    const defaultCheckOut = new Date(currentDate);

    if (currentHour >= 14) {
        defaultCheckIn.setDate(currentDate.getDate() + 1);
        defaultCheckOut.setDate(currentDate.getDate() + 2);
    } else {
        defaultCheckOut.setDate(currentDate.getDate() + 1);
    }

    const defaultSelectedDate = {
        checkIn: defaultCheckIn,
        checkOut: defaultCheckOut,
        duration: 1
    };

    const disabledReschedDates = [];
    const selectedReschedDate = defaultSelectedDate;

    return {
        disabledReschedDates,
        selectedReschedDate,

        setDisabledReschedDates: (disabledReschedDates) => {
            set({ disabledReschedDates });
            sessionStorage.setItem('disabledReschedDates', JSON.stringify(disabledReschedDates));
        },
        setSelectedReschedDate: (newDate) => {
            set({ selectedReschedDate: newDate });
            sessionStorage.setItem('selectedReschedDate', JSON.stringify(newDate));
        },
        resetReschedDate: () => {
            sessionStorage.removeItem('selectedReschedDate');
            sessionStorage.removeItem('disabledReschedDates');
            set({
                disabledReschedDates: [],
                selectedReschedDate: defaultSelectedDate,
            });
        },
    };
});

const disabledReschedDates = JSON.parse(sessionStorage.getItem('disabledReschedDates'));
if (disabledReschedDates) {
    useRescheduleDate.setState({ disabledReschedDates });
}
const selectedReschedDate = JSON.parse(sessionStorage.getItem('selectedReschedDate'));
if (selectedReschedDate) {
    useRescheduleDate.setState({ selectedReschedDate });
}

export default useRescheduleDate;
