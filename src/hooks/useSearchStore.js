import { create } from 'zustand';

// Create the store
const useSearchStore = create((set) => ({
    search: '',
    searchEmployee: '',
    setSearch: (search) => set({ search }),
    setSearchEmployee: (searchEmployee) => set({ searchEmployee }),
}));


export default useSearchStore