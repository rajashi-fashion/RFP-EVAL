import {ChromaClient, CloudClient} from 'chromadb';
import { v4 as uuidv4 } from 'uuid';
import dotenv from  'dotenv';
dotenv.config();

const client = new CloudClient({
  apiKey: process.env.CHROMA_API_KEY,
  tenant: '5ba9db92-ee27-4d42-abc9-1646ac140f78',
  database: 'rfp-evaluation'
});


export async function createCollection(collectionName) {
    try {
        return await client.createCollection({ name: collectionName });
    } catch (err) {
        if (err?.message?.toLowerCase().includes('already exists')) {
            return await client.getCollection({ name: collectionName });
        }
        console.error('Error creating collection:', err);
        throw err;
    }
}

export async function addDocumentsToCollection(collectionName, documentTexts, embeddingDataArray) {
    try {
        const collection = await client.getCollection({ name: collectionName });
        const documents = Array.isArray(documentTexts) ? documentTexts : [documentTexts];
        const embeddings = Array.isArray(embeddingDataArray) ? embeddingDataArray : [embeddingDataArray];

        if (documents.length !== embeddings.length) {
            throw new Error('documents and embeddings must have equal lengths');
        }

        await collection.add({
            ids: documents.map(() => uuidv4()),
            embeddings,
            documents,
        });
    } catch (err) {
        console.error('Error adding documents to collection:', err);
        throw err;
    }
}

export async function getDocumentsFromCollection(collectionName) {
    try {
        const collection = await client.getCollection({name: collectionName});
        const documents = await collection.get();
        return documents;
    } catch (err) {
        console.error('Error getting documents from collection:', err);
    }
}