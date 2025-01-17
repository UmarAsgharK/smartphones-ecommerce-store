import Product from "../models/product.model.js";
import Order from "../models/order.model.js";

// 1. Get All Products by Seller
export const getSellerProducts = async (req, res) => {
    try {
        const sellerId = req.user._id; // Seller's ID from authenticated user
        const products = await Product.find({ seller: sellerId });
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch products", error: error.message });
    }
};

// 2. Create a New Product
export const createProduct = async (req, res) => {
    try {
        const { name, brand, model, price, description, specifications, stock, images } = req.body;

        // Ensure all required fields are provided
        if (!name || !brand || !model || !price || !specifications || !stock) {
            return res.status(400).json({ success: false, message: "All required fields must be provided" });
        }

        // Create a new product document
        const product = new Product({
            name,
            brand,
            model,
            price,
            description,
            specifications,
            stock,
            images,
            seller: req.user._id, // Set the seller as the authenticated user
        });

        // Save the product to the database
        const savedProduct = await product.save();
        res.status(201).json({ success: true, message: "Product created successfully", product: savedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create product", error: error.message });
    }
};

// 3. Update a Product
export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const sellerId = req.user._id;

        // Find the product by ID and seller
        const product = await Product.findOne({ _id: productId, seller: sellerId });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Update the product with the request body
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({ success: true, message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update product", error: error.message });
    }
};

// 4. Delete a Product
export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const sellerId = req.user._id;

        // Find the product by ID and seller
        const product = await Product.findOneAndDelete({ _id: productId, seller: sellerId });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found or unauthorized action" });
        }

        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete product", error: error.message });
    }
};

// 5. Get Product by ID (Seller Specific)
export const getProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const sellerId = req.user._id;

        const product = await Product.findOne({ _id: productId, seller: sellerId });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found or unauthorized action" });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch product", error: error.message });
    }
};

// 6. View Seller Orders
export const getSellerOrders = async (req, res) => {
    try {
        const sellerId = req.user._id;

        const orders = await Order.find({ seller: sellerId }).populate("products.product buyer", "name email");
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch orders", error: error.message });
    }
};

// 7. Update Order Status (e.g., Shipped, Delivered)
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const validStatuses = ["processing", "shipped", "delivered", "cancelled"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid order status" });
        }

        const order = await Order.findById(orderId);
        if (!order || order.seller.toString() !== req.user._id.toString()) {
            return res.status(404).json({ success: false, message: "Order not found or unauthorized action" });
        }

        order.orderStatus = status;
        await order.save();

        res.status(200).json({ success: true, message: "Order status updated successfully", order });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update order status", error: error.message });
    }
};
