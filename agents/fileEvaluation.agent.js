const {createReactAgent} = require('@langchain/langgraph/prebuilt')
const {model} = require('./basic.agent');
const { fileEvaluationTool } = require('../tools/fileEvaluation.tool');
const { filePrompt } = require('../prompt/file_prompt'); 
const { redFlagsTool } = require('../tools/redFlags.tool');
const { developmentTool } = require('../tools/development.tool.');


const AgentFileEval =  createReactAgent({
    llm:model,
    tools:[redFlagsTool, developmentTool, fileEvaluationTool],
    prompt: filePrompt().toString()
});

module.exports = {AgentFileEval};