import { create } from 'zustand';

const useServices = create((set) => ({
    tab: JSON.parse(sessionStorage.getItem('tab')) || 0,
    selectedRooms: JSON.parse(sessionStorage.getItem('selectedRooms')) || [],
    selectedCottages: JSON.parse(sessionStorage.getItem('selectedCottages')) || [],
    selectedOthers: JSON.parse(sessionStorage.getItem('selectedOthers')) || [],
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
    pushNewOther: (other) => {
        set((state) => {
            const updatedSelectedOthers = [...state.selectedOthers, other];
            sessionStorage.setItem('selectedOthers', JSON.stringify(updatedSelectedOthers));
            return { selectedOthers: updatedSelectedOthers };
        });
    },
    removeOther: (ct) => {
        set((state) => {
            const updatedSelectedOthers = state.selectedOthers.filter(other => other.id !== ct.id);
            sessionStorage.setItem('selectedOthers', JSON.stringify(updatedSelectedOthers));
            return { selectedOthers: updatedSelectedOthers };
        });
    },

    setRoomAddOns: (roomId, addOn) => {
        set((state) => {
            const updatedSelectedRooms = state.selectedRooms.map(room => {
                // Find the room with the matching id
                if (room.id === roomId) {
                    // Copy the existing add-ons or initialize an empty array if it doesn't exist
                    const updatedAddOns = room.addOns ? [...room.addOns] : [];

                    // Find the index of the add-on with the same item_id
                    const existingIndex = updatedAddOns.findIndex(existingAddOn => existingAddOn.item_id === addOn.item_id);

                    // If add-on with the same item_id already exists
                    if (existingIndex !== -1) {
                        // Update quantity if not zero, otherwise remove the add-on
                        if (addOn.quantity !== 0) {
                            updatedAddOns[existingIndex].quantity = addOn.quantity;
                        } else {
                            updatedAddOns.splice(existingIndex, 1);
                        }
                    } else if (addOn.quantity !== 0) {
                        // Push new add-on if quantity is not zero
                        updatedAddOns.push(addOn);
                    }
                    return { ...room, addOns: updatedAddOns };
                }
                return room;
            });

            // Update the state and save it to sessionStorage
            const updatedState = { selectedRooms: updatedSelectedRooms };
            sessionStorage.setItem('selectedRooms', JSON.stringify(updatedSelectedRooms));
            return updatedState;
        });
    },



    setCottageAddOns: (cottageId, addOn) => {
        set((state) => {
            const updatedSelectedCottages = state.selectedCottages.map(cottage => {
                // Find the cottage with the matching id
                if (cottage.id === cottageId) {
                    // Copy the existing add-ons or initialize an empty array if it doesn't exist
                    const updatedAddOns = cottage.addOns ? [...cottage.addOns] : [];

                    // Find the index of the add-on with the same item_id
                    const existingIndex = updatedAddOns.findIndex(existingAddOn => existingAddOn.item_id === addOn.item_id);

                    // If add-on with the same item_id already exists
                    if (existingIndex !== -1) {
                        // Update quantity if not zero, otherwise remove the add-on
                        if (addOn.quantity !== 0) {
                            updatedAddOns[existingIndex].quantity = addOn.quantity;
                        } else {
                            updatedAddOns.splice(existingIndex, 1);
                        }
                    } else if (addOn.quantity !== 0) {
                        // Push new add-on if quantity is not zero
                        updatedAddOns.push(addOn);
                    }
                    return { ...cottage, addOns: updatedAddOns };
                }
                return cottage;
            });

            // Update the state and save it to sessionStorage
            const updatedState = { selectedCottages: updatedSelectedCottages };
            sessionStorage.setItem('selectedCottages', JSON.stringify(updatedSelectedCottages));
            return updatedState;
        });
    },

    setOtherAddOns: (otherId, addOn) => {
        set((state) => {
            const updatedSelectedOthers = state.selectedOthers.map(other => {
                // Find the other with the matching id
                if (other.id === otherId) {
                    // Copy the existing add-ons or initialize an empty array if it doesn't exist
                    const updatedAddOns = other.addOns ? [...other.addOns] : [];

                    // Find the index of the add-on with the same item_id
                    const existingIndex = updatedAddOns.findIndex(existingAddOn => existingAddOn.item_id === addOn.item_id);

                    // If add-on with the same item_id already exists
                    if (existingIndex !== -1) {
                        // Update quantity if not zero, otherwise remove the add-on
                        if (addOn.quantity !== 0) {
                            updatedAddOns[existingIndex].quantity = addOn.quantity;
                        } else {
                            updatedAddOns.splice(existingIndex, 1);
                        }
                    } else if (addOn.quantity !== 0) {
                        // Push new add-on if quantity is not zero
                        updatedAddOns.push(addOn);
                    }
                    return { ...other, addOns: updatedAddOns };
                }
                return other;
            });

            // Update the state and save it to sessionStorage
            const updatedState = { selectedOthers: updatedSelectedOthers };
            sessionStorage.setItem('selectedOthers', JSON.stringify(updatedSelectedOthers));
            return updatedState;
        });
    },

    resetServices: () => {
        sessionStorage.removeItem('tab');
        sessionStorage.removeItem('selectedRooms');
        sessionStorage.removeItem('selectedCottages');
        sessionStorage.removeItem('selectedOthers');
        set({ tab: 0, selectedRooms: [], selectedCottages: [], selectedOthers: [] });
    },
}));

export default useServices;









// selectedRooms & selectedCottages looks like this:
//   {
//     "id": 1,
//     "addOns": [
//         {
//             "itemName": "Karaoke",
//             "quantity": 1,
//             "item_id": 10
//         }
//     ]
// }