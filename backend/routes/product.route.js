import express from "express";
import { getAllProducts, getProductById } from "../controllers/product.controller.js";

const router = express.Router();

// Public Product Routes
router.route("/products").get(getAllProducts);
router.route("/products/:productId").get(getProductById);

export default router;
