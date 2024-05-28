import { create } from 'zustand';



const useSettingUpPayment = create((set) => ({
    totalRoomsPrice: JSON.parse(sessionStorage.getItem('totalRoomsPrice')) || 0,
    totalCottagesPrice: JSON.parse(sessionStorage.getItem('totalCottagesPrice')) || 0,
    totalOthersPrice: JSON.parse(sessionStorage.getItem('totalOthersPrice')) || 0,

    setTotalRoomsPrice: (totalRoomsPrice) => {
        set({ totalRoomsPrice });
        sessionStorage.setItem('totalRoomsPrice', JSON.stringify(totalRoomsPrice));
    },
    setTotalCottagesPrice: (totalCottagesPrice) => {
        set({ totalCottagesPrice });
        sessionStorage.setItem('totalCottagesPrice', JSON.stringify(totalCottagesPrice));
    },
    setTotalOthersPrice: (totalOthersPrice) => {
        set({ totalOthersPrice });
        sessionStorage.setItem('totalOthersPrice', JSON.stringify(totalOthersPrice));
    },

    resetReservation: () => {
        sessionStorage.removeItem('totalRoomsPrice');
        sessionStorage.removeItem('totalCottagesPrice');
        sessionStorage.removeItem('totalOthersPrice');
        set({ totalRoomsPrice: 0, totalCottagesPrice: 0, totalOthersPrice: 0 });
    },
}));

export default useSettingUpPayment;
