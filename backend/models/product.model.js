import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
    },
    brand: {
        type: String,
        required: [true, "Brand name is required"],
    },
    model: {
        type: String,
        required: [true, "Model is required"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"],
    },
    description: {
        type: String,
        trim: true,
    },
    specifications: {
        screenSize: {
            type: String,
            required: true,
        },
        ram: {
            type: String,
            required: true,
        },
        storage: {
            type: String,
            required: true,
        },
        camera: {
            type: String,
        },
        battery: {
            type: String,
        },
        processor: {
            type: String,
        },
        os: {
            type: String,
            required: true,
        },
        networkSupport: {
            type: [String], // Example: ['4G', '5G', 'WiFi']
        },
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        min: [0, "Stock cannot be negative"],
        default: 1,
    },
    images: {
        type: [String], // Array of image URLs
        validate: [arrayLimit, "You can upload up to 5 images"],
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
});

// Custom validator for the images array
function arrayLimit(val) {
    return val.length <= 5;
}

const Product = mongoose.model("Product", productSchema);

export default Product;
