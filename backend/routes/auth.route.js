import express from "express"
import { register, login } from "../controllers/authController"
const router = express.Router();

router.post("/register", register); // When the frontend calls /api/auth/register, call register()
router.post("/login", login);       // When the frontend calls /api/auth/login, call login()

export default router
