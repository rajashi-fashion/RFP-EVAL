const db = require('../db');


exports.login = async function(req, res) {
    const {username, password} = req.body;
    if(username === 'admin' && password === '123456') {
        res.json({message: 'Login successful', token: 'fake-jwt-token'});
    }       
    else {
        res.status(401).json({message: 'Invalid credentials'});
    }
}