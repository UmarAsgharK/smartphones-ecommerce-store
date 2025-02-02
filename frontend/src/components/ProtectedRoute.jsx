// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useAuth();

    // If there is no logged in user, redirect to login.
    if (!user) return <Navigate to="/login" replace />;

    // Check if allowedRoles is an array and if the user's role is one of them.
    if (!allowedRoles.includes(user.role)) {
        // Optionally, you could redirect to a "Not Authorized" page.
        console.log(user.role);

        return <Navigate to="/" replace />;
    }

    // If everything is okay, render the nested routes.
    return <Outlet />;
};

export default ProtectedRoute;
