import express from "express";
// import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Import routes
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
// import sellerRoutes from "./routes/seller.route.js";
// import buyerRoutes from "./routes/buyer.route.js";

// Initialize environment variables and database
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
// app.use(cors({
//   origin: process.env.CLIENT_URL || "*", // Update based on your front-end domain for security
//   methods: ["GET", "POST", "PATCH", "DELETE"], // Restrict allowed methods
//   credentials: true, // Enable cookies if needed
// }));
// app.use(cors());


// Health Check Route
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "API is running smoothly ..." });
});

// Define API Routes
app.use("/api/auth", authRoutes); // Authentication and authorization routes
app.use("/api/admin", adminRoutes); // Admin-specific routes
// app.use("/api/seller", sellerRoutes); // Seller-specific routes
// app.use("/api/buyer", buyerRoutes); // Buyer-specific routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({ success: false, error: err.message || "Internal server error" });
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
