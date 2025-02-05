import React, { useState } from 'react';
import image1 from '../../assets/daniel-korpai-aUmq85-2V7I-unsplash.jpg';
import image2 from '../../assets/vojtech-bruzek-GaDzER4qyto-unsplash.jpg';
import image3 from '../../assets/thom-bradley-1NZcjdo2hKQ-unsplash.jpg';
import image4 from '../../assets/shiwa-id-Uae7ouMw91A-unsplash.jpg';
import image5 from '../../assets/rodion-kutsaiev-0VGG7cqTwCo-unsplash.jpg';
import { Link } from "react-router-dom";
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
        <h1>Details Page</h1>
    );

};

export default ProductDetails;
