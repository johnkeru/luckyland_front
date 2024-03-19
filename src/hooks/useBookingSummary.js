import { create } from 'zustand';

const useBookingSummary = create((set) => ({
    selectedRoom: null,
    date: null, //checkIn, checkOut, duration
    customer: null,
    price: 0,
    guestInfo: {
        adult: 1,
        children: 0,
        seniors: 0,
    },
    privacyPolicy: {
        isMinimumAccepted: false,
        isPaymentWithinDay: false,
        isConfirmed: false,
    },

    setSelectedRoom: (room) => {
        localStorage.setItem('selectedRoom', JSON.stringify(room));
        localStorage.setItem('price', JSON.stringify(room.price));
        set({ selectedRoom: room, price: room.price });
    },
    removeSelectedRoom: () => {
        localStorage.removeItem('selectedRoom');
        localStorage.removeItem('date');
        localStorage.removeItem('price');
        set({ selectedRoom: null, date: null, price: 0 });
    },
    setDate: (newDate) => {
        const selectedRoom = JSON.parse(localStorage.getItem('selectedRoom'));
        if (selectedRoom) {
            const totalCost = selectedRoom.price * newDate.duration;
            set({ date: newDate, price: totalCost });
            localStorage.setItem('price', JSON.stringify(totalCost));
            localStorage.setItem('date', JSON.stringify(newDate));
        }
    },
    setCustomer: (newCustomer) => {
        set({ customer: newCustomer });
        localStorage.setItem('customer', JSON.stringify(newCustomer));
    },
    setGuestInfo: (info) => {
        set({ guestInfo: info });
        localStorage.setItem('guestInfo', JSON.stringify(info));
    },
    setPrivacyPolicy: (policy) => {
        set({ privacyPolicy: policy });
        localStorage.setItem('privacyPolicy', JSON.stringify(policy));
    },
    resetAll: () => {
        localStorage.removeItem('selectedRoom');
        localStorage.removeItem('date');
        localStorage.removeItem('customer');
        localStorage.removeItem('guestInfo');
        localStorage.removeItem('privacyPolicy');
        localStorage.removeItem('price');
        set({
            selectedRoom: null, date: null, customer: null,
            guestInfo: {
                adult: 1,
                children: 0,
                seniors: 0,
            },
            price: 0
        });
    },
}));

// Retrieve stored values from localStorage and set them in the store
const storedRoom = JSON.parse(localStorage.getItem('selectedRoom'));
if (storedRoom) {
    useBookingSummary.setState({ selectedRoom: storedRoom });
}

const storedDate = JSON.parse(localStorage.getItem('date'));
if (storedDate) {
    useBookingSummary.setState({ date: storedDate });
}

const storedCustomer = JSON.parse(localStorage.getItem('customer'));
if (storedCustomer) {
    useBookingSummary.setState({ customer: storedCustomer });
}

const storedGuestInfo = JSON.parse(localStorage.getItem('guestInfo'));
if (storedGuestInfo) {
    useBookingSummary.setState({ guestInfo: storedGuestInfo });
}

const storedPrivacyPolicy = JSON.parse(localStorage.getItem('privacyPolicy'));
if (storedPrivacyPolicy) {
    useBookingSummary.setState({ privacyPolicy: storedPrivacyPolicy });
}

const storedPrice = JSON.parse(localStorage.getItem('price'));
if (storedPrice) {
    useBookingSummary.setState({ price: storedPrice });
}


export default useBookingSummary;
