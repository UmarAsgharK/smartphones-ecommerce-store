import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, "Quantity must be at least 1"],
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
});

cartSchema.pre('save', async function (next) {
    try {
        // Recalculate the totalAmount using the product prices
        this.totalAmount = await this.items.reduce(async (totalPromise, item) => {
            const total = await totalPromise;
            const product = await Product.findById(item.product); // Fetch product details
            return total + item.quantity * product.price;
        }, Promise.resolve(0)); // Start with a resolved promise to accumulate the total

        next();
    } catch (error) {
        next(error);
    }
});



const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
