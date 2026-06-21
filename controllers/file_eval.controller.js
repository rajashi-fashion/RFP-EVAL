const db = require('../db');
const {formatResult} = require('./result_format');
const pdfParse = require('pdf-parse');
const {filePrompt} = require("../prompt/file_prompt");
const { extractPdfText } = require('./pdfParser.controller');
const {evaluateDocument} = require('../controllers/ai_eval.controller')
const fs = require('fs');

exports.fileEvalController = async (req, res) => {
    try {

        //  const result = db.prepare(`
        //     UPDATE projects SET files = ? WHERE id = ?`).run(
        //     Array.isArray(req.files) ? JSON.stringify(req.files) : req.files,
        //     req.body.id
        // ); 
        console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ")
        let mergedText = '';

        for (let file of req.files) {
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
    catch(err){
        console.error('Error uploading files:', err);
        res.status(500).json(formatResult(res, null, err));
    }
} 

