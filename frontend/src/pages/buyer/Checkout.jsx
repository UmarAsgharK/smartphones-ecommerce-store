import React, { useState } from "react";
import "./Checkout.css";

const initialCart = [
    { id: 1, name: "iPhone 15 Pro", price: 999.99, quantity: 1 },
    { id: 2, name: "Samsung Galaxy S23", price: 799.99, quantity: 2 },
];

const Checkout = () => {
    const [cart] = useState(initialCart);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Order placed successfully!");
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="checkout-container">
            <h1 className="checkout-title">Checkout</h1>

            {/* Order Summary */}
            <div className="order-summary">
                <h2>Order Summary</h2>
                {cart.map((item) => (
                    <div key={item.id} className="order-item">
                        <p>{item.name} (x{item.quantity})</p>
                        <p>${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                ))}
                <hr />
                <h3>Total: ${calculateTotal()}</h3>
            </div>

            {/* Shipping Form */}
            <form className="checkout-form" onSubmit={handleSubmit}>
                <h2>Shipping Details</h2>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Postal Code</label>
                    <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Country</label>
                    <input type="text" name="country" value={formData.country} onChange={handleChange} required />
                </div>
                <button type="submit" className="place-order-button">Place Order</button>
            </form>
        </div>
    );
};

export default Checkout;
