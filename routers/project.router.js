const express = require('express');
const router = express.Router(); 
const db = require('../db');
const {formatResult} = require('../controllers/result_format');

router.get('/all', (req, res) => {
    try {
        const results = db.prepare('SELECT * FROM projects').all();
        res.json(formatResult(res,results, null));
    } catch (err) {
        console.error('Error fetching projects:', err);
        db.prepare('CREATE TABLE IF NOT EXISTS projects (id TEXT PRIMARY KEY, name VARCHAR(255), description TEXT, files TEXT, isEvaluated INTEGER, projectOwnerId VARCHAR(255), proposalId VARCHAR(255), projectStatus TEXT, projectScore BIGINT, projectFeedback TEXT, projectFlags TEXT, projectEvaluationReportUrl VARCHAR(255), existingUrls TEXT, reviewerId VARCHAR(255), assigneeId TEXT, evaluationResult VARCHAR(255), projectmanagerId VARCHAR(255), country VARCHAR(255), industry VARCHAR(255), lastDate DATE, createdAt DATE, updatedAt DATE, createdBy VARCHAR(255), updatedBy VARCHAR(255))').run();
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id', (req, res)=>{
    try{
        const {id} = req.params;
        const stmt = db.prepare(`SELECT * FROM projects WHERE id = ?`);
        const result = stmt.get(id);
        res.json(formatResult(res, result, null))
    }catch(err){
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post('/add', (req, res) => {
    try {
        const { id, name, description, files, isEvaluated, projectOwnerId, proposalId, projectStatus, projectScore, projectFeedback, projectFlags, projectEvaluationReportUrl, existingUrls, reviewerId, assigneeId, evaluationResult, projectmanagerId, country, industry, lastDate, userId } = req.body;
        const stmt = db.prepare(`INSERT INTO projects (id, name, description, files, isEvaluated, projectOwnerId, proposalId, projectStatus, projectScore, projectFeedback, projectFlags, projectEvaluationReportUrl, existingUrls, reviewerId, assigneeId, evaluationResult, projectmanagerId, country, industry, lastDate, createdAt, updatedAt, createdBy, updatedBy) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
        const result = stmt.run(
            id, 
            name, 
            description, 
            Array.isArray(files) ? JSON.stringify(files) : files,
            isEvaluated ? 1 : 0,
            projectOwnerId, 
            proposalId, 
            projectStatus, 
            projectScore, 
            Array.isArray(projectFeedback) ? JSON.stringify(projectFeedback) : projectFeedback,
            Array.isArray(projectFlags) ? JSON.stringify(projectFlags) : projectFlags,
            projectEvaluationReportUrl, 
            Array.isArray(existingUrls) ? JSON.stringify(existingUrls) : existingUrls,
            reviewerId, 
            Array.isArray(assigneeId) ? JSON.stringify(assigneeId) : assigneeId,
            evaluationResult, 
            projectmanagerId, 
            country, 
            industry, 
            lastDate, 
            Date.now(), 
            Date.now(), 
            userId, 
            userId
        );
        res.json(formatResult(res, result, null));
    } catch (err) {
        console.error('Error adding project:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/update/:id', (req, res) => {
    try {
        const { id: paramId } = req.params;
        const { name, description, files, isEvaluated, projectOwnerId, proposalId, projectStatus, projectScore, projectFeedback, projectFlags, projectEvaluationReportUrl, existingUrls, reviewerId, assigneeId, evaluationResult, projectmanagerId, lastDate, country, industry, userId, id } = req.body;
        const stmt = db.prepare(`UPDATE projects SET name = ?, description = ?, files = ?, isEvaluated = ?, projectOwnerId = ?, proposalId = ?, projectStatus = ?, projectScore = ?, projectFeedback = ?, projectFlags = ?, projectEvaluationReportUrl = ?, existingUrls = ?, reviewerId = ?, assigneeId = ?, evaluationResult = ?, projectmanagerId = ?, country = ?, industry = ?, lastDate = ?, updatedAt = ?, updatedBy = ? WHERE id = ?`);
        const result = stmt.run(
            name, 
            description, 
            Array.isArray(files) ? JSON.stringify(files) : files,
            isEvaluated ? 1 : 0,
            projectOwnerId, 
            proposalId, 
            projectStatus, 
            projectScore, 
            Array.isArray(projectFeedback) ? JSON.stringify(projectFeedback) : projectFeedback,
            Array.isArray(projectFlags) ? JSON.stringify(projectFlags) : projectFlags,
            projectEvaluationReportUrl, 
            Array.isArray(existingUrls) ? JSON.stringify(existingUrls) : existingUrls,
            reviewerId, 
            Array.isArray(assigneeId) ? JSON.stringify(assigneeId) : assigneeId,
            evaluationResult, 
            projectmanagerId, 
            country, 
            industry, 
            lastDate,
            Date.now(), 
            userId, 
            id
        );
        res.json(formatResult(res, { changes: result.changes }, null));
    } catch (err) {
        console.error('Error updating project:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.put('/update/:id', (req, res) => {
    try {
        const { id: paramId } = req.params;
        const { name, description, files, isEvaluated, projectOwnerId, proposalId, projectStatus, projectScore, projectFeedback, projectFlags, projectEvaluationReportUrl, existingUrls, reviewerId, assigneeId, evaluationResult, projectmanagerId, country, industry, userId, id } = req.body;
        const stmt = db.prepare(`UPDATE projects SET name = ?, description = ?, files = ?, isEvaluated = ?, projectOwnerId = ?, proposalId = ?, projectStatus = ?, projectScore = ?, projectFeedback = ?, projectFlags = ?, projectEvaluationReportUrl = ?, existingUrls = ?, reviewerId = ?, assigneeId = ?, evaluationResult = ?, projectmanagerId = ?, country = ?, industry = ?, lastDate = ?, updatedAt = ?, updatedBy = ? WHERE id = ?`);
        const result = stmt.run(
            name, 
            description, 
            Array.isArray(files) ? JSON.stringify(files) : files,
            isEvaluated ? 1 : 0,
            projectOwnerId, 
            proposalId, 
            projectStatus, 
            projectScore, 
            Array.isArray(projectFeedback) ? JSON.stringify(projectFeedback) : projectFeedback,
            Array.isArray(projectFlags) ? JSON.stringify(projectFlags) : projectFlags,
            projectEvaluationReportUrl, 
            Array.isArray(existingUrls) ? JSON.stringify(existingUrls) : existingUrls,
            reviewerId, 
            Array.isArray(assigneeId) ? JSON.stringify(assigneeId) : assigneeId,
            evaluationResult, 
            projectmanagerId, 
            country, 
            industry, 
            Date.now(), 
            Date.now(), 
            userId, 
            id
        );
        res.json(formatResult(res, { changes: result.changes }, null));
    } catch (err) {
        console.error('Error updating project:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.delete('/delete/:id', (req, res) => {
    try {
        const { id } = req.params;
        const stmt = db.prepare('DELETE FROM projects WHERE id = ?');
        const result = stmt.run(id);
        res.json(formatResult(res, { changes: result }, null));
    } catch (err) {
        console.error('Error deleting project:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;