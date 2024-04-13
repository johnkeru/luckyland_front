import { create } from 'zustand';

const useTypes = create((set) => ({
    types: [],
    setTypes: (types) => {
        set({ types });
    },
}));


export default useTypes;
