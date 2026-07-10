const express = require('express');
const _evalRouter = express.Router();
const {formatResult} = require('../controllers/result_format');
const db = require('../db');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const {fileEvalController} = require('../controllers/file_eval.controller');
const { FileUploadController } = require('../controllers/fileUpload.controller');
const { ca } = require('zod/locales');
const { agent } = require('../agents/basic.agent');
const { HumanMessage } = require('@langchain/core/messages');
const upload = multer({ dest: 'uploads/' });
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const uploadWithStorage = multer({ storage: storage });

_evalRouter.post('/upload', uploadWithStorage.array('files'), FileUploadController);

_evalRouter.post('/eval_with_ai', fileEvalController)


// Chat endpoint for AI evaluation
_evalRouter.post('/chat', async (req, res)=>{
    try {
        console.log("Received request body:", req.body);
        const { message } = req.body;
        const result = await agent.invoke({messages: [new HumanMessage(message)]});
        
        const lastMessage = result.messages[result.messages.length - 1];
        const textResponse = lastMessage.content;
        console.log("Agent response:", textResponse);

        res.json(formatResult(res, textResponse, null));
    }catch(err){
        console.error('Error in /chat route:', err);
        res.status(500).json(formatResult(res, null, err));
    }
})

module.exports = _evalRouter;