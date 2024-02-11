import { create } from 'zustand';

// Create the store
const useRole = create((set) => ({
    roles: [],
    setRoles: (roles) => set({ roles }),
}));


export default useRole