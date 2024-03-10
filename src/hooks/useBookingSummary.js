import { create } from 'zustand';

const useBookingSummary = create((set) => ({
    selectedRoom: null,
    date: null, //checkIn, checkOut, duration
    customer: null,

    setSelectedRoom: (room) => {
        localStorage.setItem('selectedRoom', JSON.stringify(room));
        set({ selectedRoom: room });
    },
    removeSelectedRoom: () => {
        localStorage.removeItem('selectedRoom');
        set({ selectedRoom: null });
    },
    setDate: (newDate) => {
        set({ date: newDate });
        localStorage.setItem('date', JSON.stringify(newDate));
    },
    setCustomer: (newCustomer) => {
        set({ customer: newCustomer });
        localStorage.setItem('customer', JSON.stringify(newCustomer));
    },
    resetAll: () => {
        localStorage.removeItem('selectedRoom');
        localStorage.removeItem('date');
        localStorage.removeItem('customer');
        set({ selectedRoom: null, date: null, customer: null });
    },
}));

const storedRoom = !localStorage.getItem('selectedRoom') ? undefined : JSON.parse(localStorage.getItem('selectedRoom'));
if (storedRoom) {
    useBookingSummary.setState({ selectedRoom: storedRoom });
}

const storedDate = !localStorage.getItem('date') ? undefined : JSON.parse(localStorage.getItem('date'));
if (storedDate) {
    useBookingSummary.setState({ date: storedDate });
}

const storedCustomer = !localStorage.getItem('customer') ? undefined : JSON.parse(localStorage.getItem('customer'));
if (storedCustomer) {
    useBookingSummary.setState({ customer: storedCustomer });
}


export default useBookingSummary;
