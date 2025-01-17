import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import Review from "../models/review.model.js";

// 1. View All Products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ stock: { $gt: 0 } }); // Fetch only in-stock products
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch products", error: error.message });
    }
};

// 2. View a Product by ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch product", error: error.message });
    }
};

// 3. Add Product to Cart
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ success: false, message: "Product ID and quantity are required" });
        }

        // Fetch product details
        const product = await Product.findById(productId);
        if (!product || product.stock < quantity) {
            return res.status(400).json({ success: false, message: "Product not available in the requested quantity" });
        }

        // Reduce stock in the Product model
        product.stock -= quantity;
        await product.save();

        // Add product to the cart
        let cart = await Cart.findOne({ buyer: req.user._id });
        if (!cart) {
            cart = new Cart({ buyer: req.user._id, items: [] });
        }

        // Check if the product is already in the cart
        const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (existingItemIndex !== -1) {
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        // Recalculate the totalAmount
        cart.totalAmount = cart.items.reduce((total, item) => {
            return total + item.quantity * product.price;
        }, 0);

        // Save the cart
        const updatedCart = await cart.save();
        res.status(200).json({ success: true, cart: updatedCart });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to add product to cart", error: error.message });
    }
};


// 4. View Cart
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ buyer: req.user._id }).populate("items.product", "name price");
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }
        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch cart", error: error.message });
    }
};

// 5. Place an Order
export const placeOrder = async (req, res) => {
    try {
        const { shippingAddress } = req.body;

        // Fetch the buyer's cart
        const cart = await Cart.findOne({ buyer: req.user._id }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ success: false, message: "Cart is empty" });
        }

        let totalAmount = 0;
        const orderItems = [];

        // Verify product availability and calculate total
        for (let item of cart.items) {
            const product = item.product;
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.name}`,
                });
            }

            totalAmount += product.price * item.quantity;
            orderItems.push({
                product: product._id,
                quantity: item.quantity,
            });

            // Reduce stock in the product collection
            product.stock -= item.quantity;
            await product.save();
        }

        // Create the order
        const order = new Order({
            buyer: req.user._id,
            seller: cart.items[0].product.seller, // Assuming the seller is the same for all products
            products: orderItems,
            totalAmount,
            shippingAddress,
        });

        // Save the order
        await order.save();

        // Clear the cart after successful order
        await Cart.findOneAndDelete({ buyer: req.user._id });

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to place order",
            error: error.message,
        });
    }
};

// 6. Add a Review
export const addReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;

        if (!productId || !rating) {
            return res.status(400).json({ success: false, message: "Product ID and rating are required" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const review = new Review({
            product: productId,
            buyer: req.user._id,
            rating,
            comment,
        });

        await review.save();
        res.status(201).json({ success: true, message: "Review added successfully", review });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to add review", error: error.message });
    }
};
