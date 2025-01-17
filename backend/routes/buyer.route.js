import express from "express";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";
import {
    addToCart,
    getCart,
    placeOrder,
    addReview,
    getOrders,
    getOrderDetails,
} from "../controllers/buyer.controller.js";

const router = express.Router();

// Authenticate and Authorize all routes for buyers
router.use(authenticate, authorizeRoles("buyer"));

router.get("/dashboard", (req, res) => {
    res.status(200).json({ message: "Welcome, Buyer!" });
});

// Cart Routes
router
    .route("/cart")
    .post(addToCart) // Add product to cart
    .get(getCart); // View buyer's cart

// Order Routes
router
    .route("/orders")
    .post(placeOrder) // Place an order
    .get(getOrders); // Get all orders of the buyer

router.get("/orders/:id", getOrderDetails); // Get details of a specific order

// Review Routes
router.post("/reviews/:productId", addReview); // Add a review for a product

export default router;
