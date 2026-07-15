const {tool} = require('@langchain/core/tools');
const zod = require('zod');
const PROJECT = require('../schema/project');


//Define a tool for project inforrmation fetching
exports.projectTool = tool(
    async ({query, status})=>{
        let projects = await PROJECT.find().lean();
        if(status){
            projects = projects.filter(project => project.status === status);
        }
        if (query) {
      const lowerQuery = query.toLowerCase();
      projects = projects.filter(p => 
        p.name.toLowerCase().includes(lowerQuery) || 
        p.description.toLowerCase().includes(lowerQuery) ||
        p.projectmanagerId.toLowerCase().includes(lowerQuery) || 
        p.projectOwnerId.toLowerCase().includes(lowerQuery) || 
        p.createdAt.toDateString().includes(lowerQuery)
      );
    }
        if(projects.length === 0){
            return 'No matching projects found.';
        }
        return projects;
    },{
        name: 'projectTool',
        description: 'A tool for fetching project information. It takes a query and status as input and returns the relevant project information.',
        inputSchema: zod.object({
            query: zod.string().describe('The query to search for project information.'),
            status: zod.string().describe('The status of the project to filter the results.')
        })       
    }
);
