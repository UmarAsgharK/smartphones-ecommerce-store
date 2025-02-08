import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser"
import { fileURLToPath } from 'url';
import path from 'path';

// Import routes
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import sellerRoutes from "./routes/seller.route.js";
import produtRoutes from "./routes/product.route.js";
import buyerRoutes from "./routes/buyer.route.js";
import paymentRoutes from "./routes/payment.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Initialize environment variables and database
dotenv.config();
connectDB();

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware
app.use(express.json({ limit: "10mb" }));

const corsOptions = {
  origin: 'https://smartphones-ecommerce-store.vercel.app', // ✅ Remove the trailing slash
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

// app.use(cors({
//   origin: process.env.CLIENT_URL || "*", // Update based on your front-end domain for security
//   methods: ["GET", "POST", "PATCH", "DELETE"], // Restrict allowed methods
//   credentials: true, // Enable cookies if needed
// }));
// app.use(cors());



// Health Check Routes
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "API is running smoothly ..." });
});

// Define API Routes
app.use("/api/auth", authRoutes); // Authentication and authorization routes
app.use("/api/admin", adminRoutes); // Admin-specific routes
app.use("/api/seller", sellerRoutes); // Seller-specific routes
app.use("/api/products", produtRoutes); // product-specific routes. Anyone can access it
app.use("/api/buyer", buyerRoutes); // Buyer-specific routes
app.use("/api/payment", paymentRoutes); // Buyer-specific routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({ success: false, error: err.message || "Internal server errors" });
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
