import React from "react";
import "./product.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Product = ({
    imageUrl,
    name,
    brand,
    price,
    description,
    stock,
    rating,
}) => {
    return (
        <div className="product-card">
            <div className="product-image-container">
                <img
                    src={imageUrl || "default-image.jpg"}
                    alt={name || "Product image"}
                    className="product-image"
                />
                <div className="product-rating">
                    {rating ? rating.toFixed(1) : "N/A"} <span className="star-icon">★</span>
                </div>
            </div>
            <div className="product-details">
                <h2 className="product-title">{name || "Product Name"}</h2>
                <p className="product-brand">{brand || "Brand Unknown"}</p>
                <p className="product-price">
                    {price ? `$${price}` : "Price Not Available"}
                </p>
                {/* You can uncomment the description if needed */}
                {/* <p className="product-description">
          {description || "No description available."}
        </p> */}
                <div className="product-info-row">
                    <p className="product-stock">Stock: {stock != null ? stock : "N/A"}</p>
                    <button
                        className="buy-button"
                        aria-label={`View details for ${name || "this product"}`}
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

Product.propTypes = {
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    brand: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    stock: PropTypes.number,
    rating: PropTypes.number,
    specifications: PropTypes.shape({
        screenSize: PropTypes.number,
        ram: PropTypes.number,
        storage: PropTypes.number,
        camera: PropTypes.number,
        battery: PropTypes.number,
        processor: PropTypes.string,
        os: PropTypes.oneOf(["Android", "iOS", "Windows"]),
        networkSupport: PropTypes.arrayOf(PropTypes.string),
    }),
};

Product.defaultProps = {
    imageUrl: "default-image.jpg",
    name: "Product Name",
    brand: "Brand Unknown",
    price: null,
    description: "No description available.",
    stock: 0,
    rating: 0,
    specifications: {
        screenSize: 0,
        ram: 0,
        storage: 0,
        camera: 0,
        battery: 0,
        processor: "Unknown",
        os: "Unknown",
        networkSupport: [],
    },
};

export default Product;
