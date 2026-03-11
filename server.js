const express = require("express")
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("API is running")
})

app.post("/generate", (req, res) => {
    const product = req.body.product

    const description = `Premium ${product} designed for comfort and modern style.`

    res.json({
        product: product,
        description: description
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})