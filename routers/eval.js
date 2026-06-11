const express = require('express');
const _evalRouter = express.Router();
const {formatResult} = require('../controllers/result_format');
const db = require('../db');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const {fileEvalController} = require('../controllers/file_eval.controller');

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



_evalRouter.post('/upload', uploadWithStorage.array('files'), fileEvalController);

module.exports = _evalRouter;