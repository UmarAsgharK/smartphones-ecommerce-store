import React, { useState } from "react";
import "./signup.css"

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
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    whatsappNumber: formData.whatsappNumber,
                    password: formData.password,
                    role: formData.role,
                }),
            });

            const data = await response.json();
            console.log(data)

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
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

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
                    WhatsApp Number:
                    <input
                        type="tel"
                        name="whatsappNumber"
                        value={formData.whatsappNumber}
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

                <label>
                    Repeat Password:
                    <input
                        type="password"
                        name="repeatPassword"
                        value={formData.repeatPassword}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />

                <label>
                    Role:
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                    </select>
                </label>
                <br />

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;