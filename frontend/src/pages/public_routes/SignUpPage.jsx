import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./signup.css";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        whatsappNumber: "",
        password: "",
        repeatPassword: "",
        role: "buyer", // Default role
    });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const { user } = useAuth();
    const navigate = useNavigate();

    // Redirect if user is already logged in
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        console.log(formData);

        // Basic validation
        if (formData.password !== formData.repeatPassword) {
            setError("Passwords do not match");
            return;
        }


        try {
            const response = await fetch("https://smartphones-ecommerce-store-backend.onrender.com/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    whatsappNumber: formData.whatsappNumber,
                    password: formData.password,
                    role: formData.role,
                }),
            });

            const data = await response.json();
            // console.log(data)

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            setSuccessMessage(data.message || "Registration successful!");
            setFormData({
                name: "",
                email: "",
                whatsappNumber: "",
                password: "",
                repeatPassword: "",
                role: "buyer",
            });
            navigate("/login");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="register-form" style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
            <h2>Register</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <br />

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <br />

                <input
                    type="tel"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    placeholder="WhatsApp Number"
                    required
                />
                <br />

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
                <br />

                <input
                    type="password"
                    name="repeatPassword"
                    value={formData.repeatPassword}
                    onChange={handleChange}
                    placeholder="Repeat Password"
                    required
                />
                <br />

                <label>
                    Role:
                    <select name="role" value={formData.role} onChange={handleChange} required>
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                    </select>
                </label>
                <br />

                <button type="submit">Register</button>
            </form>
        </div >
    );
};

export default RegisterForm;