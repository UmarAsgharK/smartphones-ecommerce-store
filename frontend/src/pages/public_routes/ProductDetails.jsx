// ProductDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

const API_URL = import.meta.env.VITE_API_URL;

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);       // Fetched product data
    const [mainImage, setMainImage] = useState(null);     // Currently selected main image
    const [loading, setLoading] = useState(true);         // Loading state
    const [error, setError] = useState(null);             // Error state
    const [quantity, setQuantity] = useState(1);          // User-selected quantity

    // Placeholder reviews if backend reviews are unavailable
    const placeholderReviews = [
        { user: "Jane Doe", rating: 5, comment: "Excellent product! I love it!" },
        { user: "John Smith", rating: 4, comment: "Great value for money, would recommend." },
        { user: "Alice Brown", rating: 3, comment: "It's decent, but could be improved." }
    ];

    // Fetch product data from backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/products/${productId}`, {
                    credentials: "include",
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch product details (Status: ${response.status})`);
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                console.error("Error fetching product:", err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [productId]);

    // Set the main image once the product data is loaded
    useEffect(() => {
        if (product && product.images && product.images.length > 0) {
            setMainImage(product.images[0]);
        }
    }, [product]);

    // Early returns for loading and error states
    if (loading) return <p>Loading phone details...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!product) return <p>No product found.</p>;

    // Use fetched reviews or placeholder reviews
    const reviewsToDisplay = (product.reviews && product.reviews.length > 0)
        ? product.reviews
        : placeholderReviews;

    // Handle manual change of quantity from input field
    const handleQuantityChange = (e) => {
        const value = Number(e.target.value);
        // Clamp the value between 1 and available stock (default to 10 if not provided)
        const availableStock = product.stock || 10;
        if (value < 1) {
            setQuantity(1);
        } else if (value > availableStock) {
            setQuantity(availableStock);
        } else {
            setQuantity(value);
        }
    };

    // Handle adding the product to the cart by sending a POST request to the API.
    const handleAddToCart = async () => {
        try {
            const response = await fetch(`${API_URL}/buyer/cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ productId, quantity }),
            });
            if (!response.ok) {
                throw new Error(`Failed to add to cart(Status: ${response.status})`);
            }
            const data = await response.json();
            // You might want to show a success notification or update some global cart state here
            alert("Product added to cart successfully!");
        } catch (err) {
            console.error("Error adding product to cart:", err.message);
            alert("Error adding product to cart: " + err.message);
        }
    };

    return (
        <div className="product-details-container">
            {/* Row 1: Images & Product Details */}
            <div className="row first-row">
                {/* Product Images Section */}
                <div className="image-section">
                    {mainImage && (
                        <img src={mainImage} alt="Product" className="main-image" />
                    )}
                    <div className="thumbnail-gallery">
                        {product.images && product.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Thumbnail ${index}`}
                                className={`thumbnail ${image === mainImage ? "active-thumbnail" : ""}`}
                                onClick={() => setMainImage(image)}
                            />
                        ))}
                    </div>
                </div>

                {/* Product Details Section */}
                <div className="details-section">
                    <h1 className="product-title">{product.name}</h1>
                    <div className="price-and-rating">
                        <p className="product-price">${product.price.toFixed(2)}</p>
                        <p className="product-ratings">Rating: ⭐ {product.rating} / 5</p>
                    </div>
                    <p className="product-description">{product.description}</p>

                    {/* Cart Section */}
                    <div className="cart-section">
                        <div className="stock-info">
                            Stock: {product.stock !== undefined ? product.stock : "N/A"}
                        </div>
                        <div className="quantity-selector">
                            <input
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min="1"
                                max={product.stock || 10}
                                className="quantity-input"
                            />
                        </div>
                        <button className="add-to-cart-button" onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Row 2: Specifications & Reviews */}
            <div className="row second-row">
                <div className="specifications-section">
                    <h2>Specifications</h2>
                    <table className="specifications-table">
                        <tbody>
                            {product.specifications && Object.entries(product.specifications).map(([key, value], index) => (
                                <tr key={index}>
                                    <td className="spec-key">{key.replace(/([A-Z])/g, ' $1')}</td>
                                    <td className="spec-value">{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="reviews-section">
                    <h2>Customer Reviews</h2>
                    {reviewsToDisplay.map((review, index) => (
                        <div key={index} className="review">
                            <h3>{review.user}</h3>
                            <p>Rating: ⭐ {review.rating}</p>
                            <p>{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
