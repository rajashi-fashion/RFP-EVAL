const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { HumanMessage } = require("@langchain/core/messages");
require('dotenv').config();

const ai = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-1.5-flash"
});

exports.evaluateDocument = async (textPrompt) => {
    const message = new HumanMessage(textPrompt);
    const response = await ai.invoke([message]);

    return response.content;
};