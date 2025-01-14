import mongoose from "mongoose";
import Phone from "../models/phone.model.js";
import connectDB from "../config/db.js"; // Your database connection logic

const samplePhones = [
    {
        title: "iPhone 15 Pro Max",
        brand: "Apple",
        description: "Slightly used, 128GB, in excellent condition.",
        price: 200000,
        location: "Lahore",
        images: ["image1.jpg", "image2.jpg"],
        sellerId: new mongoose.Types.ObjectId(), // Placeholder ObjectId for sellerId
    },
    {
        title: "Samsung Galaxy S22 Ultra",
        brand: "Samsung",
        description: "Brand new with box, 256GB, 12GB RAM.",
        price: 230000,
        location: "Karachi",
        images: ["image3.jpg", "image4.jpg"],
        sellerId: new mongoose.Types.ObjectId(),
    },
    {
        title: "Xiaomi Redmi Note 12",
        brand: "Xiaomi",
        description: "Brand new, 128GB, 6GB RAM, great performance.",
        price: 45000,
        location: "Rawalpindi",
        images: ["image6.jpg"],
        sellerId: new mongoose.Types.ObjectId(),
    },
    {
        title: "Oppo Reno 8",
        brand: "Oppo",
        description: "Used for 6 months, 8GB RAM, 256GB storage.",
        price: 70000,
        location: "Faisalabad",
        images: ["image7.jpg", "image8.jpg"],
        sellerId: new mongoose.Types.ObjectId(),
    },
    {
        title: "Vivo V25",
        brand: "Vivo",
        description: "In mint condition, 12GB RAM, 256GB storage.",
        price: 85000,
        location: "Multan",
        images: ["image9.jpg"],
        sellerId: new mongoose.Types.ObjectId(),
    },
    {
        title: "Nokia G21",
        brand: "Nokia",
        description: "Durable and reliable, used for a year.",
        price: 30000,
        location: "Quetta",
        images: ["image14.jpg"],
        sellerId: new mongoose.Types.ObjectId(),
    },
    {
        title: "Google Pixel 7 Pro",
        brand: "Google",
        description: "Flagship phone, great camera, like new condition.",
        price: 180000,
        location: "Peshawar",
        images: ["image15.jpg", "image16.jpg"],
        sellerId: new mongoose.Types.ObjectId(),
    },
    {
        title: "Sony Xperia 1 III",
        brand: "Sony",
        description: "Barely used, 4K display, excellent sound quality.",
        price: 160000,
        location: "Hyderabad",
        images: ["image17.jpg"],
        sellerId: new mongoose.Types.ObjectId(),
    },
    {
        title: "LG Wing",
        brand: "LG",
        description: "Innovative dual-screen design, like new.",
        price: 90000,
        location: "Lahore",
        images: ["image18.jpg", "image19.jpg"],
        sellerId: new mongoose.Types.ObjectId(),
    },
    {
        title: "Other Smartphone",
        brand: "Other",
        description: "Great for basic usage, affordable price.",
        price: 20000,
        location: "Karachi",
        images: ["image20.jpg"],
        sellerId: new mongoose.Types.ObjectId(),
    },
];

const seedPhones = async () => {
    try {
        // Connect to the database
        await connectDB();

        // Clear the database before inserting
        await Phone.deleteMany();

        // Insert sample phones into the database
        await Phone.insertMany(samplePhones);

        console.log("Sample phones inserted successfully!");
        process.exit(); // Exit the process after seeding
    } catch (error) {
        console.error("Error seeding phones:", error.message);
        process.exit(1); // Exit the process with failure
    }
};

// Call the seeder function
seedPhones();
