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
            "Huawei",
            "Xiaomi",
            "Oppo",
            "Vivo",
            "Realme",
            "Nokia",
            "Sony",
            "LG",
            "HTC",
            "OnePlus",
            "Lenovo",
            "Motorola",
            "Asus",
            "Alcatel",
            "Google",
            "ZTE",
            "Meizu",
            "Honor",
            "BlackBerry",
            "Panasonic",
            "Micromax",
            "Infinix",
            "Tecno",
            "Itel",
            "QMobile",
            "Dcode",
            "Haier Pakistan",
            "Other"

        ],
    },
    description: {
        type: String,
        maxlength: 500,
    },
    price: {
        type: Number,
        require: true,
        min: 0
    },
    location: {
        type: String,
        require: true,
        maxlength: 100,
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
