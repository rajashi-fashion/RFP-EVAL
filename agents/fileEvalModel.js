const pdf = require('pdf-parse');
const fs = require('fs');
const {ChatGoogleGenerativeAI} = require('@langchain/google-genai');
require('dotenv').config();
const fileUplodPrompt = require('../prompt/file_prompt');

exports.fileEvalModel = async function(files) {
    if(files.length === 0) {
        return "No files provided.";
    }else{
        let masterContent = "";
        for(let file of files) {
            if(file.endsWith('.pdf')) {
                let dataBuffer = fs.readFileSync(file);
                try {
                    let data = await pdf(dataBuffer);
                    masterContent += data.text + "\n";
                } catch (err) {
                    console.error(`Error processing file ${file}:`, err);
                }
            }
        }
        const genAI = new ChatGoogleGenerativeAI({
            model: 'gemini-2.5-flash',
            apiKey: process.env.GOOGLE_API_KEY,
            maxRetries:3
        });
        const response = await genAI.invoke(await fileUplodPrompt(masterContent));
        return response;
    }


}