// Updated AuthContext with token validation on app load
import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUserAPI, logoutUserAPI } from "../services/authService";

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Set initial loading to true

    // Function to validate tokens and reinitialize user state
    const validateToken = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/auth/refresh-token`, {
                method: "POST",
                credentials: "include", // Include cookies
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user); // Reinitialize user state
            } else {
                setUser(null); // No valid token, user is not logged in
            }
        } catch (error) {
            console.error("Token validation failed:", error);
            setUser(null); // Handle error
        } finally {
            setLoading(false); // Set loading to false after validation
        }
    };

    // Validate token on app load
    useEffect(() => {
        validateToken();
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await loginUserAPI(email, password);
            setUser(response.user);
        } catch (error) {
            throw new Error(error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await logoutUserAPI();
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};