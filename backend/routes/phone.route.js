import express from "express"
import { getPhones, createPhone, updatePhoneById, getPhoneById, deletePhoneById } from "../controllers/phone.controller.js"

const router = express.Router()

router.get("/", getPhones)
router.post("/", createPhone)
router.get("/:id", getPhoneById)
router.put("/:id", updatePhoneById)
router.delete("/:id", deletePhoneById)

export default router