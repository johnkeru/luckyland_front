import { create } from 'zustand';

const useCustomer = create((set) => ({
    customer: null,
    option: null, // this has all, rooms, cottages
    setCustomer: (newCustomer) => {
        set({ customer: newCustomer });
        localStorage.setItem('customer', JSON.stringify(newCustomer));
    },
    resetCustomer: () => {
        localStorage.removeItem('option');
        localStorage.removeItem('customer');
        set({ customer: null, option: null });
    },
    setOption: (option) => {
        set({ option });
        localStorage.setItem('option', JSON.stringify(option));
    },
}));

const customer = JSON.parse(localStorage.getItem('customer'));
if (customer) {
    useCustomer.setState({ customer });
}
const option = JSON.parse(localStorage.getItem('option'));
if (option) {
    useCustomer.setState({ option });
}
export default useCustomer;
