

const express = require('express');
const { formatResult } = require('../controllers/result_format');
const db = require('../db');
const app = express();

const _router = express.Router();

_router.get('/create', (req, res) => {
    try {
        db.prepare('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name VARCHAR(100),empId VARCHAR(100), email VARCHAR(250), phone VARCHAR(100), grade VARCHAR(50), createdAt DATE, updatedAt DATE, createdBy VARCHAR(255), updatedBy VARCHAR(255))').run();
        res.json(formatResult(res, { message: 'Successfuly Created!' }, null))
    } catch (err) {
        res.json(formatResult(res, null, err));
    }
});


_router.post('/add', (req, res) => {
    try {
        const { id, name, empId, email, phone, grade} = req.body;
        const srtm = db.prepare('INSERT INTO users (id, name, empId, email, phone, grade, createdAt, updatedAt,createdBy,updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
       const result = srtm.run(id, name, empId, email, phone, grade, Date.now(), Date.now(), 'SAQW121', 'CALK35534' );
        res.json(formatResult(res, result, null))
    } catch (err) {
        res.json(formatResult(res, null, err));
    }
})

_router.get('/all', (req, res)=>{
    try{
        const data = db.prepare('SELECT * FROM users').all();
        res.json(formatResult(res, data, null))
    }catch(err){
         res.json(formatResult(res, null, err));
    }
})


module.exports = _router;