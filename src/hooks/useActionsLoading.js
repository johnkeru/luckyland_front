import { create } from 'zustand';

const useActionsLoading = create((set) => ({
    deleteLoading: false,
    updateLoading: false,
    addLoading: false,
    setDeleteLoading: (deleteLoading) => set({ deleteLoading }),
    setUpdateLoading: (updateLoading) => set({ updateLoading }),
    setAddLoading: (addLoading) => set({ addLoading }),
    editData: {},
    setEditData: (data) => set({ editData: data }),
}));


export default useActionsLoading