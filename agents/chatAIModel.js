const {ChatGoogleGenerativeAI} = require('@langchain/google-genai');
require('dotenv').config();



exports.chatAIModel = async (input) => {
    const response = await genai.invoke(input);
    return response;
}
