// import mongoose from "mongoose"
import Phone from "../models/phone.model.js";

// Get all phones
export const getPhones = async (req, res) => {
    try {
        const phones = await Phone.find();
        res.status(200).json({
            message: "Phones retrieved successfully.",
            phones,
        });
    } catch (error) {
        console.error("Error fetching phones:", error.message);
        res.status(500).json({ error: "An error occurred while fetching phones." });
    }
};

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

// Get a single phone by ID
export const getPhoneById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid phone ID format." });
        }

        const phone = await Phone.findById(id);
        console.log(phone);

        if (!phone) {
            return res.status(404).json({ error: "Phone not found." });
        }

        res.status(200).json({
            message: "Phone retrieved successfully.",
            phone,
        });
    } catch (error) {
        console.error("Error fetching phone by ID:", error.message);
        res.status(500).json({ error: "An error occurred while fetching the phone." });
    }
};

// Update phone by ID
export const updatePhoneById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid phone ID format." });
        }

        const updatedPhone = await Phone.findByIdAndUpdate(id, req.body, {
            new: true, // Return the updated document
            runValidators: true, // Ensure validation is applied
        });

        if (!updatedPhone) {
            return res.status(404).json({ error: "Phone not found." });
        }

        res.status(200).json({
            message: "Phone updated successfully.",
            phone: updatedPhone,
        });
    } catch (error) {
        console.error("Error updating phone:", error.message);
        res.status(500).json({ error: "An error occurred while updating the phone." });
    }
};

// Delete phone by ID
export const deletePhoneById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid phone ID format." });
        }

        const deletedPhone = await Phone.findByIdAndDelete(id);

        if (!deletedPhone) {
            return res.status(404).json({ error: "Phone not found." });
        }

        res.status(200).json({
            message: "Phone deleted successfully.",
            phone: deletedPhone,
        });
    } catch (error) {
        console.error("Error deleting phone:", error.message);
        res.status(500).json({ error: "An error occurred while deleting the phone." });
    }
};
