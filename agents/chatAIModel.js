const {ChatGoogleGenerativeAI} = require('@langchain/google-genai');
require('dotenv').config();



const genai = new ChatGoogleGenerativeAI({
  model: 'gemini-2.5-flash',
  apiKey: process.env.GOOGLE_API_KEY
  maxRetries:3
});

exports.chatAIModel = async (input) => {
    const response = await genai.invoke(input);
    return response;
}
