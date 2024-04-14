import { create } from 'zustand';

const useCustomer = create((set) => ({
    customer: null,
    accommodationType: 'both', // this has both, rooms, cottages
    setCustomer: (newCustomer) => {
        set({ customer: newCustomer });
        localStorage.setItem('customer', JSON.stringify(newCustomer));
    },
    resetCustomer: () => {
        localStorage.removeItem('accommodationType');
        localStorage.removeItem('customer');
        set({ customer: null, accommodationType: 'both' });
    },
    setAccommodationType: (accommodationType) => {
        set({ accommodationType });
        localStorage.setItem('accommodationType', JSON.stringify(accommodationType));
    },
}));

const customer = JSON.parse(localStorage.getItem('customer'));
if (customer) {
    useCustomer.setState({ customer });
}
const accommodationType = JSON.parse(localStorage.getItem('accommodationType'));
if (accommodationType) {
    useCustomer.setState({ accommodationType });
}
export default useCustomer;
