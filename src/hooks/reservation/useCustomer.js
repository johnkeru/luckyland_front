import { create } from 'zustand';

export const ALL = 'all';
export const ROOMS = 'rooms';
export const COTTAGES = 'cottages';
export const OTHERS = 'others';

const useCustomer = create((set) => ({
    customer: null,
    accommodationType: 'all', // this has all, rooms, cottages, others
    setCustomer: (newCustomer) => {
        set({ customer: newCustomer });
        sessionStorage.setItem('customer', JSON.stringify(newCustomer));
    },
    resetCustomer: () => {
        sessionStorage.removeItem('accommodationType');
        sessionStorage.removeItem('customer');
        set({ customer: null, accommodationType: 'all' });
    },
    setAccommodationType: (accommodationType) => {
        set({ accommodationType });
        sessionStorage.setItem('accommodationType', JSON.stringify(accommodationType));
    },
}));

const customer = JSON.parse(sessionStorage.getItem('customer'));
if (customer) {
    useCustomer.setState({ customer });
}
const accommodationType = JSON.parse(sessionStorage.getItem('accommodationType'));
if (accommodationType) {
    useCustomer.setState({ accommodationType });
}
export default useCustomer;
