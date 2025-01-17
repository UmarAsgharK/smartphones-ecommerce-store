import express from "express";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";
import {
    getSellerProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getSellerOrders,
    updateOrderStatus,
} from "../controllers/seller.controller.js";

const router = express.Router();

// Seller-only middleware
router.use(authenticate, authorizeRoles("seller"));

// Seller Dashboard Route
router.get(
    "/seller-dashboard",
    (req, res) => {
        res.status(200).json({ message: "Welcome, Seller!" });
    }
);

// Seller Product Routes
router
    .route("/products")
    .get(getSellerProducts) // View all products added by the seller
    .post(createProduct);  // Add a new product

router
    .route("/products/:productId")
    .get(getProductById)   // View product details
    .patch(updateProduct) // Update a product
    .delete(deleteProduct); // Delete a product

// Seller Order Routes
router.get(
    "/orders",
    getSellerOrders // View all orders for the seller's products
);

router.patch(
    "/orders/:orderId",
    updateOrderStatus // Update the status of a specific order
);

export default router;
