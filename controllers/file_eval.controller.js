const db = require('../db');
const {formatResult} = require('./result_format');

exports.fileEvalController = (req, res)=>{
    try {
         const result = db.prepare(`
            UPDATE projects SET files = ? WHERE id = ?`).run(
            Array.isArray(req.files) ? JSON.stringify(req.files) : req.files,
            req.body.id
        );  
        res.json({result: req.files, message: 'Files uploaded successfully'});}
    catch(err){
        console.error('Error uploading files:', err);
        res.status(500).json(formatResult(res, null, err));
    }
} 

