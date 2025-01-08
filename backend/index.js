import express from "express"
import phoneRoutes from "./routes/phone.route.js"

const app = express()
const port = 5000

app.use(express.json())

// Use the phones route
app.use("/phones", phoneRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})