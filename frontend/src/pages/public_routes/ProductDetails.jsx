import React, { useState } from 'react';
import image1 from '../../assets/daniel-korpai-aUmq85-2V7I-unsplash.jpg';
import image2 from '../../assets/vojtech-bruzek-GaDzER4qyto-unsplash.jpg';
import image3 from '../../assets/thom-bradley-1NZcjdo2hKQ-unsplash.jpg';
import image4 from '../../assets/shiwa-id-Uae7ouMw91A-unsplash.jpg';
import image5 from '../../assets/rodion-kutsaiev-0VGG7cqTwCo-unsplash.jpg';
import './ProductDetails.css';

const ProductDetails = () => {
    const product = {
        title: "Amazing Smartphone",
        price: 999.99,
        rating: 4.5,
        images: [image1, image2, image3, image4, image5],
        description: "This smartphone is packed with features, including an amazing camera, long-lasting battery, and a stunning display.",
        specifications: {
            screenSize: "6.5 inches",
            ram: "8GB",
            storage: "128GB",
            camera: "108MP",
            battery: "5000mAh",
            processor: "Snapdragon 888",
            os: "Android",
            networkSupport: "2G, 3G, 4G, 5G, WiFi",
        },
        reviews: [
            { user: "John", comment: "Fantastic product!", rating: 5 },
            { user: "Sarah", comment: "Good value for money.", rating: 4 },
            { user: "Alex", comment: "The camera is exceptional.", rating: 5 },
            { user: "Alex", comment: "The camera is exceptional.", rating: 5 },
            { user: "Alex", comment: "The camera is exceptional.", rating: 5 },
            { user: "Alex", comment: "The camera is exceptional.", rating: 5 },
            { user: "Alex", comment: "The camera is exceptional.", rating: 5 },
            { user: "Alex", comment: "The camera is exceptional.", rating: 5 },
            { user: "Alex", comment: "The camera is exceptional.", rating: 5 },
            { user: "Alex", comment: "The camera is exceptional.", rating: 5 },
            { user: "Alex", comment: "The camera is exceptional.", rating: 5 },
        ],
    };

    const [mainImage, setMainImage] = useState(product.images[0]);

    return (
        <div className="product-details-container">
            {/* Product Images Section */}
            <div className="image-section">
                <img src={mainImage} alt="Product" className="main-image" />
                <div className="thumbnail-gallery">
                    {product.images.map((image, index) => (
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
                <h1 className="product-title">{product.title}</h1>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <p className="product-rating">Rating: ⭐ {product.rating} / 5</p>
                <p className="product-description">{product.description}</p>
                <button className="buy-now-button">Buy Now</button>
            </div>

            <div className="additional-info">
                {/* Specifications Table */}
                <div className="specifications-section">
                    <h2>Specifications</h2>
                    <table className="specifications-table">
                        <tbody>
                            {Object.entries(product.specifications).map(([key, value], index) => (
                                <tr key={index}>
                                    <td className="spec-key">{key.replace(/([A-Z])/g, ' $1')}</td>
                                    <td className="spec-value">{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Reviews Section */}
                <div className="reviews-section">
                    <h2>Customer Reviews</h2>
                    {product.reviews.map((review, index) => (
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
