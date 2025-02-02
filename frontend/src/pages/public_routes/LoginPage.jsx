import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./login.css";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { login, user, loading, setLoading } = useAuth(); // Destructure login function and user state
    const navigate = useNavigate();

    // *** KEY CHANGE: useEffect to observe user changes ***
    useEffect(() => {
        if (user && Object.keys(user).length > 0) {
            console.log("User context has been updated:", user);
            // Now you can safely redirect or perform other actions that depend on the user object
            // navigate(`/${user.role}-dashboard`); // Redirect based on user role
            navigate(`/products`); // Redirect based on user role
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            // Use AuthContext's login function to handle API request
            await login(formData.email, formData.password); // Login via context
            setSuccessMessage("Login successful!");
            setFormData({ email: "", password: "" });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-form" style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br />
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <br />
                <button type="submit" disabled={loading}> {/* Disable button while loading */}
                    {loading ? "Logging in..." : "Login"} {/* Show loading text */}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
