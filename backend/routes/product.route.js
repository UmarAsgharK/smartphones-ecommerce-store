import express from "express";
import { getAllProducts, getProductById, getProductReviews } from "../controllers/product.controller.js";

const router = express.Router();

// Public Product Routes
router.route("").get(getAllProducts);
router.route("/:productId").get(getProductById);
router.route("/reviews/:productId").get(getProductReviews);

export default router;
