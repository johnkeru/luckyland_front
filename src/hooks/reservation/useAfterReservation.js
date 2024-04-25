import { create } from 'zustand';

const useAfterReservation = create((set) => ({
    conflictReservation: JSON.parse(sessionStorage.getItem('conflictReservation')) || null,

    setConflictReservation: (conflictReservation) => {
        set({ conflictReservation });
        sessionStorage.setItem('conflictReservation', JSON.stringify(conflictReservation));
    },
    resetAfterReservation: () => {
        sessionStorage.removeItem('conflictReservation');
        set({ conflictReservation: '' });
    },
}));

export default useAfterReservation;
