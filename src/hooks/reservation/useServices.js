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
    selectedRooms: [],
    selectedCottages: [],
    setSelectedRooms: (selectedRooms) => {
        set({ selectedRooms });
        localStorage.setItem('selectedRooms', JSON.stringify(selectedRooms));
    },
    setSelectedCottages: (selectedCottages) => {
        set({ selectedCottages });
        localStorage.setItem('selectedCottages', JSON.stringify(selectedCottages));
    },
    setRemoveRoom: (id) => {
        set((state) => ({
            selectedRooms: state.selectedRooms.filter(room => room.id !== id)
        }));
    },
    setRemoveCottage: (id) => {
        set((state) => ({
            selectedCottages: state.selectedCottages.filter(cottage => cottage.id !== id)
        }));
    },
    setRoomAddOns: (roomId, addOn) => {
        set((state) => ({
            selectedRooms: state.selectedRooms.map(room =>
                room.id === roomId ? { ...room, addOns: [...room.addOns, addOn] } : room
            )
        }));
    },
    setCottageAddOns: (cottageId, addOn) => {
        set((state) => ({
            selectedCottages: state.selectedCottages.map(cottage =>
                cottage.id === cottageId ? { ...cottage, addOns: [...cottage.addOns, addOn] } : cottage
            )
        }));
    },

    resetServices: () => {
        localStorage.removeItem('selectedRooms');
        localStorage.removeItem('selectedCottages');
        set({
            selectedRooms: [],
            selectedCottages: [],
        });
    },
}));

// Retrieve stored values from localStorage and set them in the store
const selectedRooms = JSON.parse(localStorage.getItem('selectedRooms'));
if (selectedRooms) {
    useServices.setState({ selectedRooms });
}

const selectedCottages = JSON.parse(localStorage.getItem('selectedCottages'));
if (selectedCottages) {
    useServices.setState({ selectedCottages });
}


export default useServices;
