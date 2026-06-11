const Project = {
    id:string, 
    name:string,
    description:string, 
    Files:string,
    isEvaluated:boolean,
    projectOwnerId:string,
    proposalId:string,
    projectStatus:string,
    projectScore:number,
    projectFeedback:string,
    projectFlags:[string],
    projectEvaluationDetails:{
        evaluationMetrics:{},
        evaluationSummary:string,
        evaluationComments:[string],
    },
    projectEvaluationHistory:{
        timestamp:Date,
        evaluatorId:string,
        evaluationMetrics:{},
        evaluationSummary:string,
        evaluationComments:[string],
    },
    projectEvaluationReportUrl:string,
    existingUrls:[string],
    reviewerId:string,
    assigneeId:[string],
    evaluationResult:string,
    projectmanagerId:string,
    country:string,
    industry:string,
    createdAt:Date,
    updatedAt:Date,
    createdBy:string,
    updatedBy:string,
}

module.exports = Project;

//id, name, description, files, isEvaluated, projectOwnerId, proposalId, projectStatus, projectScore, projectFeedback, projectFlags, projectEvaluationReportUrl, existingUrls, reviewerId, assigneeId, evaluationResult, projectmanagerId, country, industry, createdAt, updatedAt, createdBy, updatedBy