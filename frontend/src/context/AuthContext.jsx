// Updated AuthContext with global loading state
import React, { createContext, useContext, useState } from "react";
import { loginUserAPI, logoutUserAPI } from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false); // Global loading state

    const login = async (email, password) => {
        setLoading(true); // Set loading to true during login
        try {
            const response = await loginUserAPI(email, password);
            setUser(response.user);
            // Save to localStorage and navigate as needed
        } catch (error) {
            throw new Error(error.message || "Login failed");
        } finally {
            setLoading(false); // Set loading to false after login completes
        }
    };

    const logout = () => {
        setLoading(true); // Set loading to true during logout
        // Handle logout logic here
        setUser(null);
        setLoading(false); // Set loading to false after logout completes
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
