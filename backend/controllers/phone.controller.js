// import mongoose from "mongoose"
import Phone from "../models/phone.model.js";

export const getPhones = async (req, res) => {
    try {
        const phones = await Phone.find()
        console.log(phones);
        res.send("Sending all the Phones")
    } catch (error) {
        console.log(error.message)
    }
}

export const createPhone = async (req, res) => {
    try {

        // Destructure the required fields from the request body
        const { title, brand, description, location, price, images } = req.body;

        // Validate required fields
        if (!title || !brand || !price || !location || !images) {
            return res.status(400).json({ error: "Title, image, location, brand, and price are required." });
        }

        // Create a new Phone document
        const phone = new Phone({
            title,
            brand,
            description,
            location,
            price,
            images,
        });

        // Save the phone to the database
        const savedPhone = await phone.save();

        // Respond with success and the created phone
        res.status(201).json({
            message: "Phone created successfully.",
            phone: savedPhone,
        });

    } catch (error) {
        console.error("Error creating phone:", error.message);

        // Respond with an error message
        res.status(500).json({ error: "An error occurred while creating the phone." });
    }
}

export const getPhoneById = async (req, res) => {
    res.send("Get Phone by Id")
}

export const updatePhoneById = async (req, res) => {
    res.send("updating Phone Info by Id")
}

export const deletePhoneById = async (req, res) => {
    res.send("Delete a Phone Id")
}
