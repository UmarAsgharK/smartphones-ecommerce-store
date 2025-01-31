import React, { useState } from "react";
import "./Cart.css";

const initialCart = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        image: "https://via.placeholder.com/120",
        price: 999.99,
        quantity: 1,
    },
    {
        id: 2,
        name: "Samsung Galaxy S23",
        image: "https://via.placeholder.com/120",
        price: 799.99,
        quantity: 1,
    },
];

const Cart = () => {
    const [cart, setCart] = useState(initialCart);

    const handleRemove = (id) => {
        setCart(cart.filter((item) => item.id !== id));
    };

    const handleQuantityChange = (id, change) => {
        setCart(
            cart.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="cart-container">
            <h1 className="cart-title">Shopping Cart</h1>

            {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-image" />
                                <div className="cart-details">
                                    <h2>{item.name}</h2>
                                    <p className="cart-price">${item.price.toFixed(2)}</p>
                                    <div className="cart-quantity">
                                        <button onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity <= 1}>
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                                    </div>
                                </div>
                                <button className="remove-button" onClick={() => handleRemove(item.id)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2>Cart Summary</h2>
                        <p>Total: <strong>${calculateTotal()}</strong></p>
                        <button className="checkout-button">Proceed to Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
