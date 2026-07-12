const {Schema} = require('mongoose');
const mongoose = require('mongoose');


const projectSchema = new Schema({
    id:{type:String, required:true, unique:true}, 
    name:{type:String, required:true},
    description:{type:String},
    files:{type:String},
    isEvaluated:{type:Boolean},
    projectOwnerId:{type:String},
    proposalId:{type:String},
    projectStatus:{type:String},
    projectScore:{type:Number},
    projectFeedback:{type:String},
    projectFlags:{type:[String]},
    projectEvaluationDetails:{
        evaluationMetrics:{},
        evaluationSummary:{type:String},
        evaluationComments:{type:[String]},
    },
    projectEvaluationHistory:{
        timestamp:{type:Date},
        evaluatorId:{type:String},
        evaluationMetrics:{},
        evaluationSummary:{type:String},
        evaluationComments:{type:[String]},
    },
    projectEvaluationReportUrl:{type:String},
    existingUrls:{type:[String]},
    reviewerId:{type:String},
    assigneeId:{type:[String]},
    evaluationResult:{type:String},
    projectmanagerId:{type:String},
    country:{type:String},
    industry:{type:String},
    createdAt:{type:Date},
    updatedAt:{type:Date},
    createdBy:{type:String},
    updatedBy:{type:String},
})

const PROJECT = mongoose.model('Project', projectSchema);
module.exports = PROJECT;

//id, name, description, files, isEvaluated, projectOwnerId, proposalId, projectStatus, projectScore, projectFeedback, projectFlags, projectEvaluationReportUrl, existingUrls, reviewerId, assigneeId, evaluationResult, projectmanagerId, country, industry, createdAt, updatedAt, createdBy, updatedBy