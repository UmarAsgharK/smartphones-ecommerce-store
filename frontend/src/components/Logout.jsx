import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ✅ Define API_URL at the top level (Best Practice)
const API_URL = import.meta.env.VITE_API_URL;

const Logout = () => {
    const { setUser, setLoading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        setLoading(true);

        try {
            // ✅ API_URL is used correctly inside the function
            await fetch(`${API_URL}/auth/logout`, {
                method: "POST",
                credentials: "include", // Include cookies for proper logout
            });

            setUser(null); // Remove user from context
            navigate("/login"); // Redirect to login page
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setLoading(false);
        }
    };

    return <button className="logout-button" onClick={handleLogout}>Logout</button>;
};

export default Logout;
