import { create } from 'zustand';

const useUser = create((set) => ({
    token: null,
    user: null,
    setUser: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        set({ user });
    },
    setToken: (token) => {
        localStorage.setItem('token', token);
        set({ token });
    },
}));

// Try to retrieve the user from localStorage when initializing the store
const storedUser = JSON.parse(localStorage.getItem('user'));
if (storedUser) {
    useUser.setState({ user: storedUser });
}

const storedToken = localStorage.getItem('token');
if (storedToken) {
    useUser.setState({ token: storedToken });
}

export default useUser;
