import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
export const GEMINI_MODEL = "gemini-3.1-flash-lite-preview";

export const gemini = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
