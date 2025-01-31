import React from "react";
import { Link } from "react-router-dom";
import "./product.css"
import PropTypes from "prop-types";

const Product = ({ imageUrl, title, price, info, onBuy }) => {
    return (
        <Link to="/products/:productId">

            <div className="product-card">
                <img
                    src={imageUrl || "default-image.jpg"} // Fallback image
                    alt={title || "Product image"} // Fallback alt text
                    className="product-image"
                />
                <div className="product-details">
                    <h2 className="product-title">{title || "Product Title"}</h2>
                    <p className="product-price">{price ? `$${price}` : "Price Not Available"}</p>
                    <p className="product-info">{info || "No additional information available."}</p>
                    <button
                        className="buy-button"
                        aria-label={`Buy ${title || "this product"}`}
                    >
                        ViewDetails
                    </button>
                </div>
            </div>
        </Link>
    );
};

// Define Prop Types
Product.propTypes = {
    imageUrl: PropTypes.string, // URL for the product image
    title: PropTypes.string, // Product title
    price: PropTypes.number, // Product price
    info: PropTypes.string, // Additional product information
    onBuy: PropTypes.func, // Callback for buy action
};

// Default Props
Product.defaultProps = {
    imageUrl: "default-image.jpg",
    title: "Product Title",
    price: null,
    info: "No additional information available.",
    onBuy: () => alert("Buy action triggered!"),
};

export default Product;
