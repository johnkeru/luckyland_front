import { create } from 'zustand';



const useSettingUpPayment = create((set) => ({
    totalRoomsPrice: JSON.parse(sessionStorage.getItem('totalRoomsPrice')) || 0,
    totalCottagesPrice: JSON.parse(sessionStorage.getItem('totalCottagesPrice')) || 0,

    setTotalRoomsPrice: (totalRoomsPrice) => {
        set({ totalRoomsPrice });
        sessionStorage.setItem('totalRoomsPrice', JSON.stringify(totalRoomsPrice));
    },
    setTotalCottagesPrice: (totalCottagesPrice) => {
        set({ totalCottagesPrice });
        sessionStorage.setItem('totalCottagesPrice', JSON.stringify(totalCottagesPrice));
    },

    resetReservation: () => {
        sessionStorage.removeItem('totalRoomsPrice');
        sessionStorage.removeItem('totalCottagesPrice');
        set({ totalRoomsPrice: 0, totalCottagesPrice: 0 });
    },
}));

export default useSettingUpPayment;
