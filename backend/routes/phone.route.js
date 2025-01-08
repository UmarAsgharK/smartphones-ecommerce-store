import express from "express"
const router = express.Router()
import { getPhones, createPhone, updatePhoneById, getPhoneById, deletePhoneById } from "../controllers/phone.controller.js"

router.get("/", getPhones)
router.post("/", createPhone)
router.get("/:id", getPhoneById)
router.put("/:id", updatePhoneById)
router.delete("/:id", deletePhoneById)

export default router