import Product from "../models/product.model.js";
import Review from "../models/review.model.js";

// Get all active products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Error fetching products." });
    }
};

// Get a specific product by ID
export const getProductById = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ error: "Product not found." });

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: "Error fetching product." });
    }
};

// Get a Reviews for the specific product by ID
export const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;

        console.log(productId);

        const review = await Review.find({ productId });
        if (!review) return res.status(404).json({ error: "Review not found." });

        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: "Error fetching review." });
    }
};
