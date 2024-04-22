import { create } from 'zustand';

const useCustomer = create((set) => ({
    customer: null,
    accommodationType: 'both', // this has both, rooms, cottages
    setCustomer: (newCustomer) => {
        set({ customer: newCustomer });
        sessionStorage.setItem('customer', JSON.stringify(newCustomer));
    },
    resetCustomer: () => {
        sessionStorage.removeItem('accommodationType');
        sessionStorage.removeItem('customer');
        set({ customer: null, accommodationType: 'both' });
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
