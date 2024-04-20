import { create } from 'zustand';

// selectedRooms & selectedCottages looks like this:
//   {
//     "id": 1,
//     "addOns": [
//         {
//             "itemName": "Karaoke",
//             "quantity": 1,
//             "inventoryId": 10
//         }
//     ]
// }

const useServices = create((set) => ({
    tab: JSON.parse(sessionStorage.getItem('tab')) || 0,
    selectedRooms: JSON.parse(sessionStorage.getItem('selectedRooms')) || [],
    selectedCottages: JSON.parse(sessionStorage.getItem('selectedCottages')) || [],
    setTab: (tab) => {
        set({ tab });
        sessionStorage.setItem('tab', JSON.stringify(tab));
    },
    pushNewRoom: (room) => {
        set((state) => {
            const updatedSelectedRooms = [...state.selectedRooms, room];
            sessionStorage.setItem('selectedRooms', JSON.stringify(updatedSelectedRooms));
            return { selectedRooms: updatedSelectedRooms };
        });
    },
    removeRoom: (rm) => {
        set((state) => {
            const updatedSelectedRooms = state.selectedRooms.filter(room => room.id !== rm.id);
            sessionStorage.setItem('selectedRooms', JSON.stringify(updatedSelectedRooms));
            return { selectedRooms: updatedSelectedRooms };
        });
    },
    pushNewCottage: (cottage) => {
        set((state) => {
            const updatedSelectedCottages = [...state.selectedCottages, cottage];
            sessionStorage.setItem('selectedCottages', JSON.stringify(updatedSelectedCottages));
            return { selectedCottages: updatedSelectedCottages };
        });
    },
    removeCottage: (ct) => {
        set((state) => {
            const updateSelectedCottages = state.selectedCottages.filter(cottage => cottage.id !== ct.id);
            sessionStorage.setItem('selectedCottages', JSON.stringify(updateSelectedCottages));
            return { selectedCottages: updateSelectedCottages };
        });
    },
    setRoomAddOns: (roomId, addOn) => {
        set((state) => {
            const updatedSelectedRooms = state.selectedRooms.map(room => {
                if (room.id === roomId) {
                    let updatedAddOns = room.addOns ? [...room.addOns] : [];
                    const existingIndex = updatedAddOns.findIndex(existingAddOn => existingAddOn.inventoryId === addOn.inventoryId);

                    // If add-on with the same inventoryId already exists
                    if (existingIndex !== -1) {
                        // Update quantity if not zero
                        if (addOn.quantity !== 0) {
                            updatedAddOns[existingIndex].quantity = addOn.quantity;
                        } else {
                            // Remove add-on if quantity becomes zero
                            updatedAddOns.splice(existingIndex, 1);
                        }
                    } else {
                        // Add new add-on if not zero quantity
                        if (addOn.quantity !== 0) {
                            updatedAddOns.push(addOn);
                        }
                    }

                    // If only one add-on left and its quantity is zero, remove the addOns key
                    if (updatedAddOns.length === 1 && updatedAddOns[0].quantity === 0) {
                        return { ...room, addOns: [] };
                    }

                    return { ...room, addOns: updatedAddOns };
                }
                return room;
            });
            sessionStorage.setItem('selectedRooms', JSON.stringify(updatedSelectedRooms));
            return { selectedRooms: updatedSelectedRooms };
        });
    },

    setCottageAddOns: (cottageId, addOn) => {
        set((state) => {
            const updatedSelectedCottages = state.selectedCottages.map(cottage => {
                if (cottage.id === cottageId) {
                    let updatedAddOns = [...cottage.addOns];
                    const existingIndex = updatedAddOns.findIndex(existingAddOn => existingAddOn.inventoryId === addOn.inventoryId);

                    if (existingIndex !== -1) {
                        if (addOn.quantity !== 0) {
                            updatedAddOns[existingIndex].quantity = addOn.quantity;
                        } else {
                            updatedAddOns.splice(existingIndex, 1);
                        }
                    } else {
                        if (addOn.quantity !== 0) {
                            updatedAddOns.push(addOn);
                        }
                    }

                    if (updatedAddOns.length === 1 && updatedAddOns[0].quantity === 0) {
                        return { ...cottage, addOns: [] };
                    }

                    return { ...cottage, addOns: updatedAddOns };
                }
                return cottage;
            });
            sessionStorage.setItem('selectedCottages', JSON.stringify(updatedSelectedCottages));
            return { selectedCottages: updatedSelectedRooms };
        });
    },
    resetServices: () => {
        sessionStorage.removeItem('tab');
        sessionStorage.removeItem('selectedRooms');
        sessionStorage.removeItem('selectedCottages');
        set({ tab: 0, selectedRooms: [], selectedCottages: [] });
    },
}));

export default useServices;
