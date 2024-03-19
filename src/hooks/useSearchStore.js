import { create } from 'zustand';

// Create the store
const useSearchStore = create((set) => ({
    search: '',
    searchEmployee: '',
    searchDeliver: '',
    searchWaste: '',
    searchUnavailable: '',
    searchReservation: '',
    setSearch: (search) => set({ search: search.toLowerCase() }),
    setSearchEmployee: (searchEmployee) => set({ searchEmployee: searchEmployee.toLowerCase() }),
    setSearchDeliver: (searchDeliver) => set({ searchDeliver: searchDeliver.toLowerCase() }),
    setSearchWaste: (searchWaste) => set({ searchWaste: searchWaste.toLowerCase() }),
    setSearchUnavailable: (searchUnavailable) => set({ searchUnavailable: searchUnavailable.toLowerCase() }),
    setSearchReservation: (searchReservation) => set({ searchReservation: searchReservation.toLowerCase() }),
}));


export default useSearchStore