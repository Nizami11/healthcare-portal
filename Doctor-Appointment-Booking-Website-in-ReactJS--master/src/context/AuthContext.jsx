import { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState(null); // 'admin', 'doctor', or 'patient'

    const login = (userData, type) => {
        setUser(userData);
        setUserType(type);
    };

    const logout = () => {
        setUser(null);
        setUserType(null);
    };

    return (
        <AuthContext.Provider value={{ user, userType, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
