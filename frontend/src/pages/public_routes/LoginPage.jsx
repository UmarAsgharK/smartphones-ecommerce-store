import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            // Handle success
            setSuccessMessage(data.message || "Login successful!");

            // Optionally clear the form fields after successful login
            setFormData({
                email: "",
                password: "",
            });

            // Since the backend is setting the cookies, we don't need to manually set them in frontend.
            // Redirect user after successful login
            navigate("/"); // Replace with your desired route

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="register-form" style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
