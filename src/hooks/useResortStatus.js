import { create } from 'zustand';

// Create the store
const useResortStatus = create((set) => ({
    status: JSON.parse(localStorage.getItem('status')),
    setStatus: (status) => {
        localStorage.setItem('status', JSON.stringify(Boolean(status)))
        set({ status: Boolean(status) })
    },
}));


export default useResortStatus