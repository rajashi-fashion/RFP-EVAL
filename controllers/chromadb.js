import {ChromaClient, CloudClient} from 'chromadb';
import { v4 as uuidv4 } from 'uuid';
import dotenv from  'dotenv';
dotenv.config();

const client = new CloudClient({
  apiKey: process.env.CHROMA_API_KEY,
  tenant: '5ba9db92-ee27-4d42-abc9-1646ac140f78',
  database: 'rfp-evaluation'
});


export async function createCollection(collectionName, embadingData) {
   try{
     const collection = await client.createCollection({name: collectionName});
    await collection.add({
        ids: [uuidv4()],
        embeddings: [embadingData],
        documents: embadingData
    });
   }catch(err){
        console.error('Error creating collection:', err);
   }
}

export async function addDocumentsToCollection(collectionName, documents) {
    try {
        const collection = await client.getCollection({name: collectionName});
        await collection.add({
            ids: [uuidv4()],
            embeddings: [embadingData],
            documents: embadingData
        });
    } catch (err) {
        console.error('Error adding documents to collection:', err);
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