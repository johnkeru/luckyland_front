import { create } from 'zustand';

const useCategories = create((set) => ({
    categories: [],
    setCategories: (categories) => {
        set({ categories });
    },
}));


export default useCategories;
