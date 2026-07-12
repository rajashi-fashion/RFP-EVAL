const { formatResult } = require('../controllers/result_format');
const PROJECT = require('../schema/project');

const AnalyticsController = async(req, res)=>{
    try{
       
        const totalProjects = await PROJECT.countDocuments().exec();
        const totalBasic = await PROJECT.countDocuments({ projectStatus: 'basic' }).exec();
        const totalAssignee = await PROJECT.countDocuments({ projectStatus: 'assignee' }).exec();
        const totalFileSubmitted = await PROJECT.countDocuments({ projectStatus: 'fileSubmit' }).exec();
        const totalEvaluated = await PROJECT.countDocuments({ isEvaluated: true }).exec();
        const totalNotEvaluated = await PROJECT.countDocuments({ isEvaluated: false }).exec();
        const totalApproved = await PROJECT.countDocuments({ projectStatus: 'approved' }).exec();
        const totalCanceled = await PROJECT.countDocuments({ projectStatus: 'canceled' }).exec();
        console.log('AnalyticsController called');

        res.json(formatResult(res, {
            totalProjects,
            totalBasic,
            totalAssignee,
            totalFileSubmitted,
            totalEvaluated,
            totalNotEvaluated,
            totalApproved,
            totalCanceled
        }, null));
    }catch(err){
        res.status(500).json(formatResult(res, null, err));
    }


}

module.exports = AnalyticsController;