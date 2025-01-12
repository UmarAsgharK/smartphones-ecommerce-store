import express from "express"
import phoneRoutes from "./routes/phone.route.js"
import connectDB from "./config/db.js"


const app = express()
const port = 5000


app.use(express.json())


// Use the phones route
app.use("/api/phones", phoneRoutes)


app.listen(port, () => {
  connectDB()
  console.log(`Example app listening on port ${port}`)
})