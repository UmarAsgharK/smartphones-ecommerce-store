import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logout from "./Logout";
import "./navbar.css";

const GlassmorphicNavbar = () => {
    const { user } = useAuth(); // Get user from AuthContext

    return (
        <nav className="glass-navbar">
            <div className="navbar-container">
                {/* Brand Logo */}
                <h1 className="brand">
                    <Link to="/">Vendora</Link>
                </h1>

                {/* Navigation Links */}
                <div className="nav-links">
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Products
                    </NavLink>

                    {/* Role BASED routes for user now in the navbar i.e admin, buyer and seller */}
                    {user ? (
                        <>
                            {/* Buyer Links */}
                            {user.role === "buyer" && (
                                <>
                                    <NavLink
                                        to="/buyer/checkout"
                                        className={({ isActive }) => (isActive ? "active" : "")}
                                    >
                                        Checkout
                                    </NavLink>
                                    <NavLink
                                        to="/buyer/payment"
                                        className={({ isActive }) => (isActive ? "active" : "")}
                                    >
                                        Payment
                                    </NavLink>
                                    <NavLink
                                        to="/buyer/orders"
                                        className={({ isActive }) => (isActive ? "active" : "")}
                                    >
                                        Orders
                                    </NavLink>
                                    <NavLink
                                        to="/buyer/cart"
                                        className={({ isActive }) => (isActive ? "active" : "")}
                                    >
                                        Cart
                                    </NavLink>
                                </>
                            )}

                            {/* Seller Links */}
                            {user.role === "seller" && (
                                <>
                                    <NavLink
                                        to="/seller/add-product"
                                        className={({ isActive }) => (isActive ? "active" : "")}
                                    >
                                        Add Product
                                    </NavLink>
                                    <NavLink
                                        to="/seller/products"
                                        className={({ isActive }) => (isActive ? "active" : "")}
                                    >
                                        My Products
                                    </NavLink>
                                    <NavLink
                                        to="/seller/orders"
                                        className={({ isActive }) => (isActive ? "active" : "")}
                                    >
                                        Recieved Orders
                                    </NavLink>
                                </>
                            )}

                            {/* Admin Links */}
                            {user.role === "admin" && (
                                <>
                                    <NavLink
                                        to="/admin/dashboard"
                                        className={({ isActive }) => (isActive ? "active" : "")}
                                    >
                                        Dashboard
                                    </NavLink>
                                    <NavLink
                                        to="/admin/users"
                                        className={({ isActive }) => (isActive ? "active" : "")}
                                    >
                                        Users
                                    </NavLink>
                                </>
                            )}

                            {/* Logout Link (shown for all logged in users) */}
                            <Logout />
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
                                Login
                            </NavLink>
                            <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>
                                Register
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default GlassmorphicNavbar;
