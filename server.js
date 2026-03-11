import express from "express";
import OpenAI from "openai";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.static("public"));

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/generate", async (req, res) => {
    try {

        const { product } = req.body;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: `Write a short product description for: ${product}`
                }
            ]
        });

        const text = completion.choices[0].message.content;

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