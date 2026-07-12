const express = require('express');
const router = express.Router(); 
const db = require('../db');
const {formatResult} = require('../controllers/result_format');
const PROJECT = require('../schema/project');
const FilterController = require('../controllers/filterController');
const AnalyticsController = require('../controllers/analyticsController');

router.get('/all', async(req, res) => {
    // try {
    //     const results = db.prepare('SELECT * FROM projects').all();
    //     res.json(formatResult(res,results, null));
    // } catch (err) {
    //     console.error('Error fetching projects:', err);
    //     db.prepare('CREATE TABLE IF NOT EXISTS projects (id TEXT PRIMARY KEY, name VARCHAR(255), description TEXT, files TEXT, isEvaluated INTEGER, projectOwnerId VARCHAR(255), proposalId VARCHAR(255), projectStatus TEXT, projectScore BIGINT, projectFeedback TEXT, projectFlags TEXT, projectEvaluationReportUrl VARCHAR(255), existingUrls TEXT, reviewerId VARCHAR(255), assigneeId TEXT, evaluationResult VARCHAR(255), projectmanagerId VARCHAR(255), country VARCHAR(255), industry VARCHAR(255), lastDate DATE, createdAt DATE, updatedAt DATE, createdBy VARCHAR(255), updatedBy VARCHAR(255))').run();
    //     res.status(500).json({ error: 'Internal Server Error' });
    // }
    try {
        const projects = await PROJECT.find().lean();
        res.json(formatResult(res, projects, null));
    } catch (err) {
        console.error('Error fetching projects:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/analytics', AnalyticsController);

router.get('/list', async(req, res)=>{
    try{
        const {page, limit} = req.query;
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 10;
        const skip = (pageNumber - 1) * limitNumber;
        const projects = await PROJECT.find().skip(skip).limit(limitNumber);
        res.json(formatResult(res, projects, null));
    }catch(err){
        console.error('Error fetching projects:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const project = await PROJECT.findById(id).lean();
        if(!project){
            return res.status(404).json({error: 'Project not found'});
        }
        res.json(formatResult(res, project, null));
    }catch(err){
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post('/add', async (req, res) => {
    try {
        const project = new PROJECT(req.body);
        await project.save();
        res.json(formatResult(res, project, null));
    } catch (err) {
        console.error('Error adding project:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/update/:id', async (req, res) => {
    try {
        const { id: paramId } = req.params;
        const project = await PROJECT.findByIdAndUpdate(paramId, req.body, { new: true });
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(formatResult(res, project, null));
    } catch (err) {
        console.error('Error updating project:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.put('/update/:id', async (req, res) => {
    try {
        const { id: paramId } = req.params;
        console.log('Updating project with ID:', paramId, 'with data:', req.body);
        const project = await PROJECT.findByIdAndUpdate(paramId, req.body, { new: true });
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(formatResult(res, project, null));
    } catch (err) {
        console.error('Error updating project:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const project = await PROJECT.findByIdAndDelete(id);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(formatResult(res, project, null));
    } catch (err) {
        console.error('Error deleting project:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/filter', FilterController);



module.exports = router;