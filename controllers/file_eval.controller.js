const db = require('../db');
const {formatResult} = require('./result_format');
const pdfParse = require('pdf-parse');
const {filePrompt} = require("../prompt/file_prompt");
const { extractPdfText } = require('./pdfParser.controller');
const {evaluateDocument} = require('../controllers/ai_eval.controller')
const fs = require('fs');
const  {GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI} = require('@langchain/google-genai')
require('dotenv').config();

exports.fileEvalController = async (req, res) => {
    try {
        let project = req.body;
        let mergedText = '';
        
        if(project.files && project.files.length > 0){
            for (let file of project.files) {
                const pdfBuffer = fs.readFileSync(file.path);
                const text = await extractPdfText(pdfBuffer);
                mergedText += `
                    FILE: ${file.originalname}
                    ---------------------
                    ${text}
                `;
            }
        console.log(filePrompt(mergedText));
        const Ai_Response = await  evaluateDocument(filePrompt(mergedText));
        console.log("#################################################\n", Ai_Response);
        res.json({result: Ai_Response, message: 'Files uploaded successfully'});
        }
    }
    catch(err){
        console.error('Error uploading files:', err);
        res.status(500).json(formatResult(res, null, err));
    }
} 

