import { createContext, useState, useContext } from "react";

const Auth = createContext({
    user: null,
    token: null,
    setUser: () => null,
    setToken: () => null,
});

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");

    return (
        <Auth.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </Auth.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => useContext(Auth);
