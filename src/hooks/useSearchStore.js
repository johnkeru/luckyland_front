import { create } from 'zustand';

// Create the store
const useSearchStore = create((set) => ({
    search: '',
    searchEmployee: '',
    searchDeliver: '',
    searchWaste: '',
    searchUnavailable: '',
    setSearch: (search) => set({ search: search.toLowerCase() }),
    setSearchEmployee: (searchEmployee) => set({ searchEmployee: searchEmployee.toLowerCase() }),
    setSearchDeliver: (searchDeliver) => set({ searchDeliver: searchDeliver.toLowerCase() }),
    setSearchWaste: (searchWaste) => set({ searchWaste: searchWaste.toLowerCase() }),
    setSearchUnavailable: (searchUnavailable) => set({ searchUnavailable: searchUnavailable.toLowerCase() }),
}));


export default useSearchStore