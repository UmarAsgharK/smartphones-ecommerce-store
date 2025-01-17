import express from "express";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";
import {
    getAllProducts,
    getProductById,
    addToCart,
    getCart,
    placeOrder,
    addReview,
} from "../controllers/buyer.controller.js";

const router = express.Router();

// Authenticate and Authorize all routes for buyers
router.use(authenticate, authorizeRoles("buyer"));

// Product Routes
router.get("/products", getAllProducts); // View all products
router.get("/products/:productId", getProductById); // View a product by ID

// Cart Routes
router.post("/cart", addToCart); // Add product to cart
router.get("/cart", getCart); // View buyer's cart

// Order Routes
router.post("/orders", placeOrder); // Place an order

// Review Routes
router.post("/reviews", addReview); // Add a review for a product

export default router;
