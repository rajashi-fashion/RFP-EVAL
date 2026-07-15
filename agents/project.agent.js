const {ChatGoogleGenerativeAI} = require('@langchain/google-genai');
const {createReactAgent} = require('@langchain/langgraph/prebuilt');
const {projectTool} = require('../tools/project.tool')

const projectModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GOOGLE_API_KEY,
    maxRetries: 2, // Controls auto-retries when rate limits hit
});

exports.projectAgent = createReactAgent({
    llm: projectModel,
    tools: [projectTool],
    prompt:`You are an internal project management assistant. 
You have access to a project database tool. Whenever a user asks about projects, budgets, who is leading what, or project status, always use the 'projectTool' tool to fetch up-to-date details before answering. Do not make up project details.`
});
