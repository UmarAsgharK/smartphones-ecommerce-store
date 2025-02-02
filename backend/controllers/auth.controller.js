import User from "../models/user.model.js"
import { redis } from "../lib/redis.js"
import bcrypt from "bcryptjs"
import jwt, { decode } from "jsonwebtoken"

const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })

    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" })

    return { accessToken, refreshToken }
}

const storeRefreshToken = async (userId, refreshToken) => {
    await redis.set(`refresh_token:${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60)
}

const setCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true, // Prevent XSS attacks
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", // Prevent CSRF attacks,
        maxAge: 15 * 60 * 1000
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true, // Prevent XSS attacks
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", // Prevent CSRF attacks,
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
}

// Register Logic
export const register = async (req, res) => {
    const { name, email, password, whatsappNumber, role } = req.body; // Get data from the request
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        console.log(existingUser);

        if (existingUser) {
            console.log("User already exists");
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({ name, email, password, whatsappNumber, role }); // Create a new user
        await newUser.save(); // Save the user to the database

        const { accessToken, refreshToken } = generateTokens(newUser._id)
        await storeRefreshToken(newUser._id, refreshToken)
        setCookies(res, accessToken, refreshToken)

        res.status(201).json({ message: "User registered successfully" }); // Respond with success
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle errors
    }
};

// Logout Functionality
export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (refreshToken) {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            await redis.del(`refresh_token:${decoded.userId}`)
        }

        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")
        res.json({ message: "Logged out Successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle errors
    }
}

// Login Logic
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }); // Find the user by email
        if (!user) return res.status(404).json({ message: "User not found" }); // Handle user not found

        const isPasswordValid = await bcrypt.compare(password, user.password); // Compare password
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

        const { accessToken, refreshToken } = generateTokens(user._id)
        await storeRefreshToken(user._id, refreshToken)

        setCookies(res, accessToken, refreshToken)

        // hide the password because sending it the user in body so prevent theft
        user.password = undefined

        res.json({ user }); // Respond with token and user info
        // res.json({ token }); // Respond with token when working with headers directly
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const refreshTheAccessToken = async (req, res) => {
    try {
        const refresh_token = req.cookies.refreshToken;
        if (!refresh_token) {
            return res.status(401).json({ message: "No refresh token provided" })
        }

        const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET)
        const storedToken = await redis.get(`refresh_token:${decoded.userId}`)

        console.log(refresh_token, "\n", storedToken);
        if (storedToken === refresh_token) {
            console.log(refresh_token, "\n", storedToken);
            // return res.status(401).json({ message: "Invalid Refresh Token" })
        }

        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })

        res.cookie("accessToken", accessToken, {
            httpOnly: true, // Prevent XSS attacks
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict", // Prevent CSRF attacks,
            maxAge: 15 * 60 * 1000
        })

        res.json({ message: "Token Refresh Successfully" })
    } catch (err) {

    }
}