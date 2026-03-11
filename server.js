import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();

app.use(express.json());
app.use(express.static("public"));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/generate", async (req, res) => {
    try {

        const { product } = req.body;

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash"
        });

        const prompt = `Write a short product description for: ${product}`;

        const result = await model.generateContent(prompt);

        const text = result.response.text();

        res.json({ text });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            text: error.message
        });

    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});