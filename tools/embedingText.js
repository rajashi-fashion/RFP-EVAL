import  { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';

const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_API_KEY,
    modelName: "gemini-embedding-001",
});

export const getEmbeddings = (pdfText) => embeddings.embedQuery(pdfText);