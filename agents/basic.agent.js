import {tool } from "@langchain/core/tools";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createReactAgent  } from "@langchain/langgraph/prebuilt";
import {z} from "zod";

export const model = new ChatGoogleGenerativeAI({
        model: "gemini-2.5-flash",
        apiKey: process.env.GOOGLE_API_KEY,
        maxRetries: 2, // Controls auto-retries when rate limits hit
    });

export const agent = createReactAgent({
    llm: model,
    tools: []
});
