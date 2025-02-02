import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
    const { setUser, setLoading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        setLoading(true);

        try {
            // Send logout request to backend
            await fetch("http://localhost:5000/api/auth/logout", {
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
