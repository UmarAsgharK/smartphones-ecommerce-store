import express from "express"
import { register, login, logout, refreshTheAccessToken } from "../controllers/auth.controller.js"
import { authenticate } from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post("/register", register); // When the frontend calls /api/auth/register, call register()
router.post("/login", login);       // When the frontend calls /api/auth/login, call login()
router.post("/logout", logout);       // When the frontend calls /api/auth/logout, call logout()
router.post("/refresh-token", refreshTheAccessToken);
router.get("/profile", authenticate, async (req, res) => {
    res.status(200).json({ user: req.user });
})


export default router
