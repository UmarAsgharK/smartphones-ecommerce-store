import express from "express"
import { register, login } from "../controllers/auth.controller.js"
import { authenticate } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post("/register", register); // When the frontend calls /api/auth/register, call register()
router.post("/login", login);       // When the frontend calls /api/auth/login, call login()
router.get("/profile", authenticate, async (req, res) => {
    res.status(200).json({ user: req.user });
})


export default router
