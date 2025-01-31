import React, { useState } from "react";
import "./Payment.css";

const initialCart = [
    { id: 1, name: "iPhone 15 Pro", price: 999.99, quantity: 1 },
    { id: 2, name: "Samsung Galaxy S23", price: 799.99, quantity: 2 },
];

const Payment = () => {
    const [cart] = useState(initialCart);
    const [paymentMethod, setPaymentMethod] = useState("credit-card");
    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        expiry: "",
        cvv: "",
    });

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleCardChange = (e) => {
        setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        alert("Payment Successful!");
    };

    return (
        <div className="payment-container">
            <h1 className="payment-title">Payment</h1>

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

            {/* Payment Form */}
            <form className="payment-form" onSubmit={handlePaymentSubmit}>
                <h2>Select Payment Method</h2>
                <div className="payment-options">
                    <label>
                        <input
                            type="radio"
                            value="credit-card"
                            checked={paymentMethod === "credit-card"}
                            onChange={handlePaymentMethodChange}
                        />
                        Credit Card
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="paypal"
                            checked={paymentMethod === "paypal"}
                            onChange={handlePaymentMethodChange}
                        />
                        PayPal
                    </label>
                </div>

                {/* Credit Card Details */}
                {paymentMethod === "credit-card" && (
                    <div className="card-details">
                        <div className="form-group">
                            <label>Card Number</label>
                            <input
                                type="text"
                                name="cardNumber"
                                value={cardDetails.cardNumber}
                                onChange={handleCardChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Expiry Date</label>
                            <input
                                type="text"
                                name="expiry"
                                value={cardDetails.expiry}
                                onChange={handleCardChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>CVV</label>
                            <input
                                type="text"
                                name="cvv"
                                value={cardDetails.cvv}
                                onChange={handleCardChange}
                                required
                            />
                        </div>
                    </div>
                )}

                <button type="submit" className="pay-button">Pay Now</button>
            </form>
        </div>
    );
};

export default Payment;
