
const authRouter = require('express').Router();
const {login} = require('../controllers/login.controller');

authRouter.post('/login', login);

module.exports = authRouter;