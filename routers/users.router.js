const express = require('express');
const { formatResult } = require('../controllers/result_format');
const db = require('../db');
const app = express();
const USER = require('../schema/user');

const userRouter = express.Router();

userRouter.get('/all', async(req, res)=>{
    console.log("Start...");
    try{
        const users = await USER.find().lean();
        res.json(formatResult(res, users, null));
    }catch(err){
        console.error("Error fetching users data:", err);
        res.json(formatResult(res, null, err));
    }
})

userRouter.get('/create', async (req, res) => {
    try {
        const result = new USER(req.body);
        await result.save();
        res.json(formatResult(res, result, null));
    } catch (err) {
        res.json(formatResult(res, null, err));
    }
});


userRouter.post('/add', async (req, res) => {
    try {
        const result = new USER(req.body);
        await result.save();
        res.json(formatResult(res, result, null));
    } catch (err) {
        res.json(formatResult(res, null, err));
    }
})

userRouter.get('/:id', (req, res)=>{
    try{
        const {id} = req.params;
        const result = USER.findOne({id});
        if(!result){
            return res.status(404).json({error: 'User not found'});
        }
        res.json(formatResult(res, result, null))
    }catch(err){
        res.json(formatResult(res, null, err));
    }
})




module.exports = userRouter;