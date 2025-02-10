import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate in v6
import "./Cart.css";

const API_URL = import.meta.env.VITE_API_URL;

const Cart = () => {
    // We store only the items array from the fetched cart object.
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch cart data when the component mounts
    useEffect(() => {
        fetch(`${API_URL}/buyer/cart`, {
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                // Extract the items array from the returned cart object
                setCartItems(data.items || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching cart:", err.message);
                setError("Failed to load cart. Please try again later.");
                setLoading(false);
            });
    }, []);

    // Remove an item from the cart and update the backend
    const handleRemove = (id) => {
        fetch(`${API_URL}/buyer/cart/item/${id}`, {
            method: "DELETE",
            credentials: "include",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to remove item from cart");
                }
                return response.json();
            })
            .then(() => {
                // Update the local state after a successful removal
                setCartItems(cartItems.filter((item) => item._id !== id));
            })
            .catch((err) => {
                console.error("Error removing item:", err.message);
                alert("Failed to remove item from cart.");
            });
    };

    // Update the quantity of an item in the cart; ensures a minimum quantity of 1
    const handleQuantityChange = (id, change) => {
        const updatedItems = cartItems.map((item) =>
            item._id === id
                ? { ...item, quantity: Math.max(1, item.quantity + change) }
                : item
        );
        setCartItems(updatedItems);
        // Optionally, send a PATCH/PUT request to update the quantity on the backend.
    };

    // Calculate the total price for the cart items
    const calculateTotal = () => {
        return cartItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2);
    };

    // Navigate to the checkout page
    const handleCheckout = () => {
        navigate("/buyer/checkout");
    };

    if (loading) {
        return (
            <div className="cart-container">
                <h1 className="cart-title">Shopping Cart</h1>
                <p className="loading">Loading cart...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="cart-container">
                <h1 className="cart-title">Shopping Cart</h1>
                <p className="error">{error}</p>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h1 className="cart-title">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p className="empty-cart">Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item._id} className="cart-item">
                                {/* Display product details from the populated productId object */}
                                {/* <img
                                    src={item.productId.image}
                                    alt={item.productId.name}
                                    className="cart-image"
                                /> */}
                                <div className="cart-details">
                                    <h2>{item.productId.name}</h2>
                                    <p className="cart-price">${item.price.toFixed(2)}</p>
                                    <div className="cart-quantity">
                                        <button
                                            onClick={() => handleQuantityChange(item._id, -1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item._id, 1)}>
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button
                                    className="remove-button"
                                    onClick={() => handleRemove(item._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2>Cart Summary</h2>
                        <p>
                            Total: <strong>${calculateTotal()}</strong>
                        </p>
                        <button className="checkout-button" onClick={handleCheckout}>
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
