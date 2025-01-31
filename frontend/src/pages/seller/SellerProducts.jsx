import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellerProducts.css';

const SellerProducts = () => {
    // Mock data for seller's products
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // Fetch products (this is where you would call your backend API)
    useEffect(() => {
        // Example of setting up products
        setProducts([
            { id: 1, name: "Smartphone A", price: 499, stock: 10 },
            { id: 2, name: "Smartphone B", price: 799, stock: 5 },
            { id: 3, name: "Smartphone C", price: 999, stock: 8 },
        ]);
    }, []);

    // Navigate to add product page
    const goToAddProduct = () => {
        navigate('/seller/add-product');
    };

    // Handle the update and delete buttons (these should be connected to backend later)
    const handleUpdate = (productId) => {
        console.log(`Update product with id: ${productId}`);
        // You can navigate to an update page for that product
        navigate(`/seller/update-product/${productId}`);
    };

    const handleDelete = (productId) => {
        console.log(`Delete product with id: ${productId}`);
        // In real implementation, make a request to delete the product
    };

    return (
        <div className="seller-products-container">
            <button className="add-product-btn" onClick={goToAddProduct}>
                Add Product
            </button>

            <div className="product-list">
                {products.map((product) => (
                    <div key={product.id} className="product-item">
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p>Price: ${product.price}</p>
                            <p>Stock: {product.stock}</p>
                        </div>
                        <div className="product-actions">
                            <button className="update-btn" onClick={() => handleUpdate(product.id)}>
                                Update
                            </button>
                            <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SellerProducts;
