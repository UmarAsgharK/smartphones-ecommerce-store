import express from "express"
import { deleteUser, getAllUsers } from "../controllers/admin.controller.js"
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js"

const router = express.Router();

// Admin-only route
router.get("/admin-dashboard", authenticate, authorizeRoles("admin"), (req, res) => {
    res.status(200).json({ message: "Welcome, Admin!" });
});

// ! Get All USERS
router.get("/users", authenticate, authorizeRoles("admin"), getAllUsers);

// ! Delete a User But How
router.delete("/users/:id", authenticate, authorizeRoles("admin"), deleteUser);

export default router
