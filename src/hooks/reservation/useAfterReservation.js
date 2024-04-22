import { create } from 'zustand';

const useAfterReservation = create((set) => ({
    conflictReservation: JSON.parse(sessionStorage.getItem('conflictReservation')) || null,
    reservationId: JSON.parse(sessionStorage.getItem('reservationId')) || 0,
    totalPayment: JSON.parse(sessionStorage.getItem('totalPayment')) || 0,

    setConflictReservation: (conflictReservation) => {
        set({ conflictReservation });
        sessionStorage.setItem('conflictReservation', JSON.stringify(conflictReservation));
    },
    setReservationId: (reservationId) => {
        set({ reservationId });
        sessionStorage.setItem('reservationId', JSON.stringify(reservationId));
    },
    setTotalPayment: (totalPayment) => {
        set({ totalPayment });
        sessionStorage.setItem('totalPayment', JSON.stringify(totalPayment));
    },
    resetReservation: () => {
        sessionStorage.removeItem('reservationId');
        sessionStorage.removeItem('conflictReservation');
        set({ reservationId: 0, conflictReservation: '' });
    },
}));

export default useAfterReservation;
