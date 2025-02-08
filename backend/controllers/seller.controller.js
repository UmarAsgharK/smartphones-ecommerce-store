import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

// 1. Get All Products by Seller
export const getSellerProducts = async (req, res) => {
    try {
        const sellerId = req.user.id; // Seller's ID from authenticated user
        const products = await Product.find({ seller: sellerId });
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error: error.message,
        });
    }
};

export const createProduct = async (req, res) => {
    // Assuming req.user is set by your authentication middleware.
    console.log("Seller ID:", req.user.id);
    console.log("Request Body:", req.body);

    try {
        // Destructure the expected fields from req.body.
        const { name, brand, price, description, specifications, stock } = req.body;

        // Parse specifications if sent as a JSON string.
        let specs;
        try {
            specs = typeof specifications === "string" ? JSON.parse(specifications) : specifications;
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Invalid specifications format",
            });
        }

        // Ensure all required fields are provided
        if (
            !name ||
            !brand ||
            !price ||
            !specs ||
            !specs.screenSize ||
            !specs.ram ||
            !specs.storage ||
            !specs.os ||
            !stock
        ) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided",
            });
        }

        // Create an empty array to store Cloudinary secure URLs
        let imageUrls = [];

        // req.files is populated by the Multer middleware using memory storage
        if (req.files && req.files.length > 0) {
            // Loop over each file and upload it to Cloudinary
            for (const file of req.files) {
                // Use the helper function with file.buffer
                const result = await uploadToCloudinary(file.buffer, "phone_images");
                imageUrls.push(result.secure_url);
            }
        }

        // Create a new product document (assuming a Product model exists)
        const product = new Product({
            name,
            brand,
            price,
            description,
            specifications: specs, // Parsed specifications object
            stock,
            images: imageUrls, // Array of Cloudinary secure URLs
            seller: req.user.id, // Associate with authenticated user
        });

        console.log("Product to save:", product);

        // Save the product to the database
        const savedProduct = await product.save();

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: savedProduct,
        });
    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create product: " + error.message,
            error: error.message,
        });
    }
};

// 3. Update a Product
export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const sellerId = req.user.id;

        // Find the product by ID and seller
        const product = await Product.findOne({ _id: productId, seller: sellerId });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }


        // Update the product with the request body
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update product",
            error: error.message,
        });
    }
};

// 4. Delete a Product
export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const sellerId = req.user.id;

        // Find the product by ID and seller
        const product = await Product.findOneAndDelete({
            _id: productId,
            seller: sellerId,
        });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found or unauthorized action",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete product",
            error: error.message,
        });
    }
};

// 5. Get Product by ID (Seller Specific)
export const getProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const sellerId = req.user.id;

        const product = await Product.findOne({
            _id: productId,
            seller: sellerId,
        });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found or unauthorized action",
            });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch product",
            error: error.message,
        });
    }
};

// 6. View Seller Orders
export const getSellerOrders = async (req, res) => {
    try {
        const sellerId = req.user.id;

        const orders = await Order.find({ seller: sellerId }).populate(
            "products.product buyer",
            "name email"
        );
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
            error: error.message,
        });
    }
};

// 7. Update Order Status (e.g., Shipped, Delivered)
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const validStatuses = ["processing", "shipped", "delivered", "cancelled"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status",
            });
        }

        const order = await Order.findById(orderId);
        if (!order || order.seller.toString() !== req.user._id.toString()) {
            return res.status(404).json({
                success: false,
                message: "Order not found or unauthorized action",
            });
        }

        order.orderStatus = status;
        await order.save();

        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update order status",
            error: error.message,
        });
    }
};
