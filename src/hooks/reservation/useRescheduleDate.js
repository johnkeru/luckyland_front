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

    const disabledReschedDates = JSON.parse(localStorage.getItem('disabledReschedDates')) || [];
    const selectedReschedDate = JSON.parse(localStorage.getItem('selectedReschedDate')) || defaultSelectedDate;

    return {
        disabledReschedDates,
        selectedReschedDate,

        setDisabledReschedDates: (disabledReschedDates) => {
            set({ disabledReschedDates });
            localStorage.setItem('disabledReschedDates', JSON.stringify(disabledReschedDates));
        },
        setSelectedReschedDate: (newDate) => {
            set({ selectedReschedDate: newDate });
            localStorage.setItem('selectedReschedDate', JSON.stringify(newDate));
        },
        resetReschedDate: () => {
            localStorage.removeItem('selectedReschedDate');
            localStorage.removeItem('disabledReschedDates');
            set({
                disabledReschedDates: [],
                selectedReschedDate: defaultSelectedDate,
            });
        },
    };
});

const disabledReschedDates = JSON.parse(localStorage.getItem('disabledReschedDates'));
if (disabledReschedDates) {
    useRescheduleDate.setState({ disabledReschedDates });
}
const selectedReschedDate = JSON.parse(localStorage.getItem('selectedReschedDate'));
if (selectedReschedDate) {
    useRescheduleDate.setState({ selectedReschedDate });
}

export default useRescheduleDate;
