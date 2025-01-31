import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateProduct.css';

const UpdateProduct = () => {
    const { id } = useParams(); // Get product ID from URL parameters
    const [product, setProduct] = useState({
        name: '',
        price: 0,
        description: '',
        stock: 0,
        images: [],
    });
    const navigate = useNavigate();

    // Simulate fetching product data (you would replace this with an API call)
    useEffect(() => {
        // Mock fetch (replace with real API call to fetch product by ID)
        if (id) {
            setProduct({
                name: "Smartphone A",
                price: 499.99,
                description: "A great phone with amazing features.",
                stock: 10,
                images: [], // Example empty array of images
            });
        }
    }, [id]);

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle image change (for the sake of simplicity, assuming URL input here)
    const handleImageChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission (you would send this data to your backend in a real app)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updating product:', product);
        // Send the updated product details to the backend
        // After success, navigate back to the product list page
        navigate('/seller/products');
    };

    return (
        <div className="update-product-container">
            <h1>Update Product</h1>
            <form onSubmit={handleSubmit} className="update-product-form">
                <div className="form-group">
                    <label>Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Images (up to 5)</label>
                    <input
                        type="text"
                        name="images"
                        value={product.images.join(', ')} // Assuming a comma-separated list of image URLs
                        onChange={handleImageChange}
                        required
                    />
                    <p>Enter image URLs, separated by commas.</p>
                </div>
                <button type="submit" className="submit-btn">Update Product</button>
            </form>
        </div>
    );
};

export default UpdateProduct;
