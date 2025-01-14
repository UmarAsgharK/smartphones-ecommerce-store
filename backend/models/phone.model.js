import mongoose from "mongoose";

const phoneSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 100,
        required: true
    },
    brand: {
        type: String,
        required: true,
        enum: [
            "Apple",
            "Samsung",
            "Xiaomi",
            "Oppo",
            "Vivo",
            "Nokia",
            "Sony",
            "LG",
            "OnePlus",
            "Google",
            "Other"

        ],
    },
    description: {
        type: String,
        maxlength: 500,
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    price: {
        type: Number,
        require: true,
        min: 0
    },
    location: {
        type: String,
        require: true,
        maxlength: 200,
    },
    images: {
        type: [String],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
})

const Phone = mongoose.model("Phone", phoneSchema)

export default Phone;
