import express from "express"

const router = express.Router()

router.post("/create-checkout-session", (req, res) => {
    console.log("How are you doing are you here to pay me the money");
    return res.status(200).json({ message: "Payment successful" })
})

export default router