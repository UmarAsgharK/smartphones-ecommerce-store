import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import Review from "../models/review.model.js";

// Add product to cart
/**
 * Controller: addToCart
 * Adds a product to the user's cart or updates the quantity if it already exists.
 */
export const addToCart = async (req, res) => {
    try {
        // Destructure required fields from the request body
        const { productId, quantity } = req.body;

        // Validate input
        if (!productId || !quantity || quantity <= 0) {
            return res.status(400).json({ message: "Invalid input. Please provide a valid productId and a quantity greater than 0." });
        }

        // Find the product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // OPTIONAL: Check stock availability if the product model tracks inventory
        if (typeof product.stock !== 'undefined' && product.stock < quantity) {
            return res.status(400).json({ message: "Requested quantity exceeds available stock" });
        }

        // Retrieve the existing cart for the user, or create a new one if it doesn't exist.
        // Note: Our Cart schema uses the field "userId", not "user".
        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            cart = new Cart({
                userId: req.user.id,
                items: [],
                totalPrice: 0,
            });
        }

        // Check if the product is already in the cart
        // Our schema expects the field name "productId" in each item
        const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (existingItemIndex > -1) {
            // If the product already exists in the cart, increment its quantity
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // Otherwise, add a new item to the cart with the current product price as a snapshot
            cart.items.push({
                productId,
                quantity,
                price: product.price,
            });
        }

        // Recalculate the total price for the cart
        cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

        // Save the updated cart
        await cart.save();

        // Return the updated cart in the response
        res.status(200).json(cart);
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//Get the cart
export const getCart = async (req, res) => {
    console.log(req.user);
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');

        console.log(cart.productId)
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Remove an item from the cart
export const removeCartItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        // Remove the specified item from the cart
        cart.items = cart.items.filter(
            (item) => item._id.toString() !== itemId
        );
        // Recalculate the total price
        cart.totalPrice = cart.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        console.error("Error removing item from cart:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};


// Place an order
export const placeOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');;

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Your cart is empty" });
        }

        console.log("Here");

        const order = new Order({
            buyerId: req.user.id,
            sellerId: cart.items[0].productId.seller, // Assuming all items are from the same seller
            items: cart.items,
            totalAmount: cart.totalPrice,
            status: "pending",
        });

        // console.log(cart.itms[0].productId);
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
        const { rating, comment } = req.body;
        const { productId } = req.params;

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
