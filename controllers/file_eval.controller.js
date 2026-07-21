const db = require('../db');
const {formatResult} = require('./result_format');
const pdfParse = require('pdf-parse');
const {filePrompt} = require("../prompt/file_prompt");
const { extractPdfText } = require('./pdfParser.controller');
const {evaluateDocument} = require('../controllers/ai_eval.controller');
const { AgentFileEval } = require('../agents/fileEvaluation.agent');


const fs = require('fs');
const  {GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI} = require('@langchain/google-genai')
require('dotenv').config();

exports.fileEvalController = async (req, res) => {
    try {
        let project = req.body;
        const AI_response = AgentFileEval.invoke({messages:project});
        const lastResponse = AI_response[AI_response.length - 1];
        const result = lastResponse.content;
        res.json(formatResult(req, result, null));
        
    }
    catch(err){
        console.error('Error uploading files:', err);
        res.status(500).json(formatResult(res, null, err));
    }
} 

