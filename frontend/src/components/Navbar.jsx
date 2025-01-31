import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./GlassmorphicNavbar.css";

const GlassmorphicNavbar = () => {
    return (
        <nav className="glass-navbar">
            <div className="navbar-container">
                {/* Brand Logo */}
                <h1 className="brand">
                    <Link to="/" end>
                        Vendora
                    </Link>
                </h1>

                {/* Navigation Links */}
                <div className="nav-links">
                    <NavLink
                        to="/"
                        end
                    // className={({ isActive }) => (isActive ? "active-link" : "")}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/products"
                    // className={({ isActive }) => (isActive ? "active-link" : "")}
                    >
                        View Products
                    </NavLink>
                    <NavLink
                        to="/login"
                    // className={({ isActive }) => (isActive ? "active-link" : "")}
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to="/register"
                    // className={({ isActive }) => (isActive ? "active-link" : "")}
                    >
                        Register
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default GlassmorphicNavbar;
