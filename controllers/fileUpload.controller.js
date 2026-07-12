const db = require("../db");
const { formatResult } = require("./result_format");
const pdfParse = require('pdf-parse');
const { getEmbeddings } = require("../tools/embedingText");
const { createCollection } = require("./chromadb");
const fs = require('fs');
const PROJECT = require("../schema/project");

exports.FileUploadController = (req, res)=>{
    try{
        console.log(req.files);
        // const results = db.prepare('UPDATE projects set files = ?').run(JSON.stringify(req.files));
        const fileResposns = PROJECT.updateOne({id: req.body.id}, {$set: {files: JSON.stringify(req.files)}});
        req.files.forEach(async file => {
            const filePath = file.path;
            // 2. Read the file into a Buffer
            const dataBuffer = fs.readFileSync(filePath);

            // 3. Pass the buffer into pdf-parse
            const pdfData = await pdfParse(dataBuffer);
            const embeddings = getEmbeddings(pdfData.text);
            createCollection(file.originalname, embeddings);
        });
        res.json(formatResult(res, req.files, null));
    }catch(err){
        res.json(formatResult(res, null, err));
    }
}