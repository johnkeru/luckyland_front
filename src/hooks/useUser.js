import { create } from 'zustand';

const useUser = create((set) => ({
    user: null,
    setUser: (user) => {
        // Save the user to localStorage when setUser is called
        localStorage.setItem('user', JSON.stringify(user));
        set({ user });
    },
}));

// Try to retrieve the user from localStorage when initializing the store
const storedUser = JSON.parse(localStorage.getItem('user'));
if (storedUser) {
    useUser.setState({ user: storedUser });
}

export default useUser;
