const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config();
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log("🖥️  process.env.GEMINI_API_KEY: ", process.env.GEMINI_API_KEY)

// ...

async function generateRes(instructions,userInput){
    // The Gemini 1.5 models are versatile and work with most use cases
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const prompt = instructions + userInput

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    return text
}
module.exports = {
    generateRes
}
