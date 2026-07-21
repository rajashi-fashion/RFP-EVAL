const { tool } = require('@langchain/core/tools');
const z = require('zod');
const PROJECT = require('../schema/project');

// Import your Chroma vector store & Embeddings model setup
const { Chroma } = require('@langchain/community/vectorstores/chroma');
const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');

// Setup embeddings (Ensure GOOGLE_API_KEY is configured in your environment)
const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "text-embedding-004"
});

const redFlagsTool = tool(
    async ({ projectId }) => {
        try {
            // 1. Fetch the project details
            const project = await PROJECT.findById(projectId).lean();
            if (!project) {
                return `Project with ID ${projectId} not found.`;
            }

            // 2. Connect to ChromaDB for this collection
            // Tip: Use a collection name specific to the project or target PDF
            const collectionName = `${projectId.files[0].name}`;
            
            const vectorStore = await Chroma.fromExistingCollection(embeddings, {
                collectionName: collectionName,
                url: process.env.CHROMA_API_KEY || "http://localhost:8000"
            });

            // 3. Perform Similarity Search in ChromaDB using the agent's query
            const results = await vectorStore.similaritySearch(query, 4);

            if (!results || results.length === 0) {
                return "No relevant context found in the uploaded project documents.";
            }

            // 4. Combine retrieved document chunks into context text for the agent
            const contextText = results
                .map((doc, index) => `--- Snippet ${index + 1} ---\n${doc.pageContent}`)
                .join("\n\n");

            return `Relevant Context from Project Files:\n\n${contextText}`;

        } catch (err) {
            return `Error querying ChromaDB vector store: ${err.message}`;
        }
    },
    {
        name: 'redFlagsTool',
        description: 'A tool for retrieve data from uploaded project PDF documents using vector search in ChromaDB. It takes projectId and provide the missing requirements, FQA, any question related to project/requirement and key Challenges.',
        schema: z.object({
            projectId: z.string().describe('The database ID of the target project.'),
        })
    }
);

module.exports = { redFlagsTool };