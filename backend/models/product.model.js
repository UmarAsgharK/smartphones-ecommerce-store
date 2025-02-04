import mongoose from "mongoose";

const specificationSchema = new mongoose.Schema({
    screenSize: {
        type: Number, // Screen size in inches
        required: true,
        min: [3, "Screen size must be at least 3 inches"],
    },
    ram: {
        type: Number, // RAM in GB
        required: true,
        min: [1, "RAM must be at least 1 GB"],
    },
    storage: {
        type: Number, // Storage in GB
        required: true,
        min: [8, "Storage must be at least 8 GB"],
    },
    camera: {
        type: Number, // Primary camera resolution in MP
        min: [1, "Camera resolution must be at least 1 MP"],
    },
    battery: {
        type: Number, // Battery capacity in mAh
        min: [1000, "Battery capacity must be at least 1000 mAh"],
    },
    processor: {
        type: String, // Processor name
        required: true,
        trim: true,
    },
    os: {
        type: String,
        required: true,
        enum: ["Android", "iOS", "Windows"],
    },
    networkSupport: {
        type: [String],
        enum: ["2G", "3G", "4G", "5G", "WiFi"],
    },
});

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
        },
        brand: {
            type: String,
            required: [true, "Brand name is required"],
            enum: [
                "Apple",
                "Samsung",
                "Xiaomi",
                "Oppo",
                "Vivo",
                "OnePlus",
                "Google",
                "Huawei",
                "Sony",
                "LG",
                "Motorola",
                "Nokia",
                "Realme",
                "Tecno",
                "Infinix",
                "Honor",
                "ZTE",
                "Asus",
                "HTC",
                "BlackBerry", // For historical completeness
                "Nothing",
                "Fairphone", // Example of a niche brand
                "Other",
            ],
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
            type: specificationSchema,
            required: true,
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
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
            validate: {
                validator: function (val) {
                    return val.length <= 5;
                },
                message: "You can upload up to 5 images",
            },
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    { timestamps: true } // Automatically handles createdAt and updatedAt
);

const Product = mongoose.model("Product", productSchema);

export default Product;
