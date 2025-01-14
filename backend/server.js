import express from "express"
import phoneRoutes from "./routes/phone.route.js"
import authRoutes from "./routes/auth.route.js"
import connectDB from "./config/db.js"
import dotenv from "dotenv"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 6000


app.use(express.json())


// Use the phones route
app.use("/api/phones", phoneRoutes)
app.use("/api/auth", authRoutes)


app.listen(PORT, () => {
  connectDB()
  console.log(`Example app listening on port ${PORT}`)
})