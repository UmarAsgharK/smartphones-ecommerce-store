import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Refers to the "users" collection
        required: true,
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true,
                min: 0
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    stripeSessionId: {
        type: String,
        unqiue: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
    },

}, {
    timestamps: true
});

export default mongoose.model('Order', orderSchema);
