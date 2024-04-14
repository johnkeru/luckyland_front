import { create } from 'zustand';

const useAfterReservation = create((set) => ({
    conflictReservation: JSON.parse(localStorage.getItem('conflictReservation')) || null,
    reservationId: JSON.parse(localStorage.getItem('reservationId')) || 0,

    setConflictReservation: (conflictReservation) => {
        set({ conflictReservation });
        localStorage.setItem('conflictReservation', JSON.stringify(conflictReservation));
    },
    setReservationId: (reservationId) => {
        set({ reservationId });
        localStorage.setItem('reservationId', JSON.stringify(reservationId));
    },

    resetReservation: () => {
        localStorage.removeItem('reservationId');
        localStorage.removeItem('conflictReservation');
        set({ reservationId: 0, conflictReservation: '' });
    },
}));


export default useAfterReservation;
