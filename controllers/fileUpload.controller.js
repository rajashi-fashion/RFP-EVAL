const db = require("../db");
const { formatResult } = require("./result_format")

exports.FileUploadController = (req, res)=>{
    try{
        console.log(req.files);
        const results = db.prepare('UPDATE projects set files = ?').run(JSON.stringify(req.files));
        res.json(formatResult(res, req.files, null));
    }catch(err){
        res.json(formatResult(res, null, err));
    }
}