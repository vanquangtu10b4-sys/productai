import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/generate", async (req, res) => {
    try {

        const { product } = req.body;

        if (!product) {
            return res.status(400).json({
                error: "Product name is required"
            });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [
                {
                    role: "system",
                    content: "You are an expert ecommerce copywriter."
                },
                {
                    role: "user",
                    content: `Write a professional ecommerce product description for: ${product}. Include benefits and make it persuasive.`
                }
            ],
            max_tokens: 200
        });

        const description = completion.choices[0].message.content;

        res.json({
            description
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "AI generation failed"
        });

    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});