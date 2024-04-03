import { create } from 'zustand';

const useAfterReservation = create((set) => ({
    reservationId: 0,
    setReservationId: (reservationId) => {
        set({ reservationId });
        localStorage.setItem('reservationId', JSON.stringify(reservationId));
    },
    resetReservation: () => {
        localStorage.removeItem('reservationId');
        set({ reservationId: 0 });
    },
}));

const reservationId = JSON.parse(localStorage.getItem('reservationId'));
if (reservationId) {
    useAfterReservation.setState({ reservationId });
}
export default useAfterReservation;
