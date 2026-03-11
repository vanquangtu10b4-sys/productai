import express from "express";
import Groq from "groq-sdk";

const app = express();

app.use(express.json());
app.use(express.static("public"));

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

app.post("/generate", async (req, res) => {

    try {

        const { product } = req.body;

        const prompt = `Write a short product description for: ${product}`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "llama3-8b-8192"
        });

        const text = chatCompletion.choices[0].message.content;

        res.json({ text });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            text: "Error generating description"
        });

    }

});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});