const {createReactAgent} = require('@langchain/langgraph/prebuilt')
const {model} = require('./basic.agent');
const { fileEvaluationTool } = require('../tools/fileEvaluation.tool');
const { filePrompt } = require('../prompt/file_prompt') 


const _agent =  createReactAgent({
    llm:model,
    tools:[fileEvaluationTool],
    prompt: filePrompt().toString()
})