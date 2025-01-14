import User from "../models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Register Logic
export const register = async (req, res) => {
    const { name, email, password, role } = req.body; // Get data from the request
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const newUser = new User({ name, email, password: hashedPassword, role }); // Create a new user
        await newUser.save(); // Save the user to the database
        res.status(201).json({ message: "User registered successfully" }); // Respond with success
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle errors
    }
};

// Login Logic
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }); // Find the user by email
        if (!user) return res.status(404).json({ message: "User not found" }); // Handle user not found

        const isMatch = await bcrypt.compare(password, user.password); // Compare password
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        }); // Generate JWT token
        res.json({ token, user }); // Respond with token and user info
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
