const db = require("../db");
const { formatResult } = require("./result_format");
const pdfParse = require('pdf-parse');
const { getEmbeddings } = require("../tools/embedingText");
const { createCollection, addDocumentsToCollection, getDocumentsFromCollection} = require("./chromadb");
const fs = require('fs');
const PROJECT = require("../schema/project");

function splitTextIntoChunks(text, chunkSize = 1000, overlap = 200) {
    const normalized = text.replace(/\s+/g, ' ').trim();
    const chunks = [];
    let start = 0;

    while (start < normalized.length) {
        let end = Math.min(start + chunkSize, normalized.length);
        if (end < normalized.length) {
            const lastSpace = normalized.lastIndexOf(' ', end);
            if (lastSpace > start) {
                end = lastSpace;
            }
        }

        const chunk = normalized.slice(start, end).trim();
        if (chunk) {
            chunks.push(chunk);
        }

        start = end - overlap;
        if (start < 0) {
            start = 0;
        }
    }

    return chunks;
}

exports.FileUploadController = async (req, res)=>{
    try{
        console.log(req.files);
        // const results = db.prepare('UPDATE projects set files = ?').run(JSON.stringify(req.files));
        const fileResposns = PROJECT.updateOne({id: req.body.id}, {$set: {files: JSON.stringify(req.files)}});

        await createCollection(req.body.id);

        for (const file of req.files) {
            const filePath = file.path;
            // 2. Read the file into a Buffer
            const dataBuffer = fs.readFileSync(filePath);

            // 3. Pass the buffer into pdf-parse
            const pdfData = await pdfParse(dataBuffer);
            const chunks = splitTextIntoChunks(pdfData.text, 1200, 200);
            const embeddings = [];

            for (const chunk of chunks) {
                embeddings.push(await getEmbeddings(chunk));
            }

            await addDocumentsToCollection(req.body.id, chunks, embeddings);
        }

        res.json(formatResult(res, req.files, null));
    }catch(err){
        res.json(formatResult(res, null, err));
    }
}
