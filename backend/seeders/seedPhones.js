import Phone from "../models/phone.model.js";
import connectDB from "../config/db.js"; // Your database connection logic

const samplePhones = [
    {
        title: "iPhone 13 Pro Max",
        brand: "Apple",
        description: "Slightly used, 128GB, in excellent condition.",
        price: 200000,
        location: "Lahore",
        images: ["image1.jpg", "image2.jpg"],
    },
    {
        title: "Samsung Galaxy S22 Ultra",
        brand: "Samsung",
        description: "Brand new with box, 256GB, 12GB RAM.",
        price: 230000,
        location: "Karachi",
        images: ["image3.jpg", "image4.jpg"],
    },
    {
        title: "Huawei P40 Pro",
        brand: "Huawei",
        description: "Barely used, great camera, 8GB RAM.",
        price: 150000,
        location: "Islamabad",
        images: ["image5.jpg"],
    },
    {
        title: "Xiaomi Redmi Note 12",
        brand: "Xiaomi",
        description: "Brand new, 128GB, 6GB RAM, great performance.",
        price: 45000,
        location: "Rawalpindi",
        images: ["image6.jpg"],
    },
    {
        title: "Oppo Reno 8",
        brand: "Oppo",
        description: "Used for 6 months, 8GB RAM, 256GB storage.",
        price: 70000,
        location: "Faisalabad",
        images: ["image7.jpg", "image8.jpg"],
    },
    {
        title: "Vivo V25",
        brand: "Vivo",
        description: "In mint condition, 12GB RAM, 256GB storage.",
        price: 85000,
        location: "Multan",
        images: ["image9.jpg"],
    },
    {
        title: "Realme 11 Pro",
        brand: "Realme",
        description: "Used for 3 months, great battery life.",
        price: 60000,
        location: "Sialkot",
        images: ["image10.jpg"],
    },
    {
        title: "Infinix Zero Ultra",
        brand: "Infinix",
        description: "Brand new, 8GB RAM, 128GB storage.",
        price: 40000,
        location: "Hyderabad",
        images: ["image11.jpg", "image12.jpg"],
    },
    {
        title: "Tecno Camon 20 Pro",
        brand: "Tecno",
        description: "Great condition, excellent for daily use.",
        price: 35000,
        location: "Peshawar",
        images: ["image13.jpg"],
    },
    {
        title: "Nokia G21",
        brand: "Nokia",
        description: "Durable and reliable, used for a year.",
        price: 30000,
        location: "Quetta",
        images: ["image14.jpg"],
    },
];


const seedPhones = async () => {
    try {
        // Connect to the database
        await connectDB();

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
