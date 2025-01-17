import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import Review from "../models/review.model.js";

// Add product to cart
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [], totalPrice: 0 });
        }

        // Check if product already in cart
        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity, price: product.price });
        }

        // Update total price
        cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Get the cart
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Place an order
export const placeOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Your cart is empty" });
        }

        const order = new Order({
            buyerId: req.user.id,
            sellerId: cart.items[0].productId.sellerId, // Assuming all items are from the same seller
            items: cart.items,
            totalAmount: cart.totalPrice,
            status: "pending",
        });

        await order.save();

        // Clear the cart after order placement
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Add a review for a product
export const addReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const review = new Review({
            productId,
            userId: req.user.id,
            rating,
            comment,
        });

        await review.save();
        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Get all orders for the buyer
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ buyerId: req.user.id }).populate('items.productId');
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Get order details
export const getOrderDetails = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items.productId');

        if (!order || order.buyerId.toString() !== req.user.id) {
            return res.status(404).json({ message: "Order not found or unauthorized access" });
        }

        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
