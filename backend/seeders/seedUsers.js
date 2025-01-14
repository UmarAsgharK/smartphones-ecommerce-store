import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/user.model.js"; // Adjust the path to your User model

const seedUsers = [
    {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "hashedpassword1",
        role: "buyer",
        profilePicture: "https://example.com/john.jpg",
        whatsappNumber: "+12345678901"
    },
    {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        password: "hashedpassword2",
        role: "seller",
        profilePicture: "https://example.com/jane.jpg",
        whatsappNumber: "+19876543210"
    },
    {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        password: "hashedpassword3",
        role: "buyer",
        profilePicture: "https://example.com/alice.jpg",
        whatsappNumber: "+11223344556"
    },
    {
        name: "Bob Brown",
        email: "bob.brown@example.com",
        password: "hashedpassword4",
        role: "seller",
        profilePicture: "https://example.com/bob.jpg",
        whatsappNumber: "+14455667788"
    },
    {
        name: "Charlie Davis",
        email: "charlie.davis@example.com",
        password: "hashedpassword5",
        role: "buyer",
        profilePicture: null,
        whatsappNumber: null
    },
    {
        name: "Diana Green",
        email: "diana.green@example.com",
        password: "hashedpassword6",
        role: "seller",
        profilePicture: "https://example.com/diana.jpg",
        whatsappNumber: "+15556667777"
    },
    {
        name: "Edward Harris",
        email: "edward.harris@example.com",
        password: "hashedpassword7",
        role: "buyer",
        profilePicture: null,
        whatsappNumber: "+16667778888"
    },
    {
        name: "Fiona Scott",
        email: "fiona.scott@example.com",
        password: "hashedpassword8",
        role: "seller",
        profilePicture: "https://example.com/fiona.jpg",
        whatsappNumber: null
    },
    {
        name: "George White",
        email: "george.white@example.com",
        password: "hashedpassword9",
        role: "buyer",
        profilePicture: "https://example.com/george.jpg",
        whatsappNumber: "+17778889999"
    },
    {
        name: "Hannah Young",
        email: "hannah.young@example.com",
        password: "hashedpassword10",
        role: "seller",
        profilePicture: "https://example.com/hannah.jpg",
        whatsappNumber: "+18889990000"
    }
];


const seedDatabase = async () => {
    try {
        // Connect to the database
        await connectDB();

        console.log("Connected to the database.");

        // Clear existing users (optional)
        await User.deleteMany({});
        console.log("Existing users cleared.");

        // Insert seed data
        await User.insertMany(seedUsers);
        console.log("Seed data inserted successfully.");

        // Close connection
        console.log("Database connection closed.");
        process.exit(); // Exit the process after seeding
    } catch (error) {
        console.error("Error seeding the database:", error);
        process.exit(1); // Exit process with failure
    }
};

seedDatabase();
