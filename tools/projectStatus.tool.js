const { tool } = require("@langchain/core/tools");
const PROJECT = require("../schema/project");
const z = require("zod");

const ProjectStatusTool = tool(
    async () => {
        try {
            // 1. Properly await the DB query
            const _projects = await PROJECT.find().lean();

            if (!_projects || _projects.length === 0) {
                return "No Data exists related to your query.";
            }

            // 2. Return stringified JSON for the LLM to parse
            return JSON.stringify(_projects);
        } catch (error) {
            return `Error fetching projects: ${error.message}`;
        }
    },
    {
        name: "ProjectStatusTool",
        description:
            "Fetches all projects from the database for health auditing. " +
            "Use this tool to evaluate overdue deadlines, unsubmitted files, pending evaluations, and unassigned projects.",
        schema: z.object({
            // Gemini requires a valid Zod schema structure
            dummy: z.string().optional().describe("Not required")
        })
    }
);

module.exports = { ProjectStatusTool };