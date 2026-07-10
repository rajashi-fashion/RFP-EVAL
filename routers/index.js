const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const _router = express.Router();
const {formatResult} = require('../controllers/result_format');

_router.get('/', (req, res)=>{
    res.json(formatResult('Welcome to the API', null));
});
_router.use('/user', require('./users.router'));
_router.use('/auth', require('./auth'));
_router.use('/eval', require('./eval'));
_router.use('/projects', require('./project.router'));
module.exports = _router;
