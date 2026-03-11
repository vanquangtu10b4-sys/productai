import express from "express";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(express.json());
app.use(express.static("public"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/generate", async (req, res) => {

    try {

        const { product } = req.body;

        if (!product) {
            return res.json({ text: "Please enter a product name." });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are an expert product copywriter."
                },
                {
                    role: "user",
                    content: `Write a compelling product description for: ${product}`
                }
            ]
        });

        const text = completion.choices[0].message.content;

        res.json({
            text: text
        });

    } catch (error) {

        console.error(error);

        res.json({
            text: "Error generating description."
        });

    }

});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server running on port " + PORT);
});