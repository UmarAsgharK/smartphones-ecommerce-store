// src/components/GuestRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GuestRoute = ({ children }) => {
    const { user } = useAuth();

    // If user is logged in, redirect them.
    if (user) {
        // Optionally, redirect based on role:
        // if (user.role === "admin") return <Navigate to="/admin/dashboard" />;
        // else if (user.role === "seller") return <Navigate to="/seller/products" />;
        // else if (user.role === "buyer") return <Navigate to="/buyer/cart" />;
        // For now, we'll just redirect to home.
        return <Navigate to="/" />;
    }
    return children;
};

export default GuestRoute;
