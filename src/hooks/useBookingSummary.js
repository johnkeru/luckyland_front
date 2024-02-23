import { create } from 'zustand';

function calculateTotalPrice(items) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        total += parseInt(items[i].price);
    }
    return total + '.00';
}

const useBookingSummary = create((set) => ({
    selectedRooms: [],
    date: null, //checkIn, checkOut, duration
    customer: null,
    total_charge: 0,

    setSelectedRooms: (room) => {
        const storedRooms = JSON.parse(localStorage.getItem('selectedRooms')) || [];
        const existingRoomIndex = storedRooms.findIndex(existingRoom => existingRoom.id === room.id);
        if (existingRoomIndex !== -1) {
            storedRooms[existingRoomIndex] = room; // Replace existing room with the new one
        } else {
            storedRooms.push(room); // Otherwise, push the new room
        }
        localStorage.setItem('selectedRooms', JSON.stringify(storedRooms));
        set({ selectedRooms: storedRooms });
        const totalCharge = calculateTotalPrice(storedRooms);
        localStorage.setItem('total_charge', totalCharge);
        set({ total_charge: totalCharge });
    },
    removeSelectedRoom: (roomToRemove) => {
        const storedRooms = JSON.parse(localStorage.getItem('selectedRooms')) || [];
        const updatedRooms = storedRooms.filter(room => room.id !== roomToRemove.id);
        localStorage.setItem('selectedRooms', JSON.stringify(updatedRooms));
        set({ selectedRooms: updatedRooms });
        const totalCharge = calculateTotalPrice(updatedRooms);
        localStorage.setItem('total_charge', totalCharge);
        set({ total_charge: totalCharge });
    },
    setDate: (newDate) => {
        set({ date: newDate });
        localStorage.setItem('date', JSON.stringify(newDate));
    },

    setCustomer: (newCustomer) => {
        set({ customer: newCustomer });
        localStorage.setItem('customer', JSON.stringify(newCustomer));
    },
    resetRooms: () => {
        localStorage.removeItem('selectedRooms');
        localStorage.removeItem('total_charge');
        set({ selectedRooms: [], total_charge: 0 });
    },
    resetAll: () => {
        localStorage.removeItem('selectedRooms');
        localStorage.removeItem('date');
        localStorage.removeItem('customer');
        localStorage.removeItem('total_charge');
        set({ selectedRooms: [], date: null, customer: null, total_charge: 0 });
    },
}));

// Try to retrieve the selectedRooms, date, customer, and total_charge from localStorage when initializing the store
const storedRooms = !localStorage.getItem('selectedRooms') ? undefined : JSON.parse(localStorage.getItem('selectedRooms'));
if (storedRooms) {
    useBookingSummary.setState({ selectedRooms: storedRooms });
}

const storedDate = !localStorage.getItem('date') ? undefined : JSON.parse(localStorage.getItem('date'));
if (storedDate) {
    useBookingSummary.setState({ date: storedDate });
}

const storedCustomer = !localStorage.getItem('customer') ? undefined : JSON.parse(localStorage.getItem('customer'));
if (storedCustomer) {
    useBookingSummary.setState({ customer: storedCustomer });
}

const storedTotalCharge = localStorage.getItem('total_charge');
if (storedTotalCharge) {
    useBookingSummary.setState({ total_charge: storedTotalCharge });
}

export default useBookingSummary;
