import { gemini, GEMINI_MODEL } from "./_util.js";

const RECOMMENDATION_SYSTEM_PROMPT = "You are an expert film curator. Use the provided user watchlist and watched movies to recommend 6 movies. Analyze the rated movies to understand the user's preferences, and analyze the watchlist to see what the user is currently interested in. Vary suggestions such that they don't all relate to the same provided movie. DO NOT recommend any movies already on either list. For each movie return the movie title and release year.";
const RECOMMENDATION_SCHEMA = {
    description: "A list of movie recommendations based on user history",
    type: "array",
    items: {
        type: "object",
        properties: {
            title: {
                type: "string",
                description: "The exact title of the movie."
            },
            year: {
                type: "string",
                description: "The 4-digit release year."
            }
        },
        required: ["title", "year"]
    }
};

export default async function handler(request, response) {
    if (request.method !== "POST") return response.status(405).json({ error: "Method Not Allowed" });

    try {
        const { data } = request.body;

        if (!data) return response.status(400).json({ error: "'data' in POST body is required" });

        const prompt = `${RECOMMENDATION_SYSTEM_PROMPT}\n\n${data}`;

        const res = await gemini.models.generateContent({
            model: GEMINI_MODEL,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseJsonSchema: RECOMMENDATION_SCHEMA
            }
        });

        if (res.text) {
            return response.status(200).json(res.text);
        } else {
            throw new Error("Gemini API Error: No text response");
        }
    } catch (err) {
        return response.status(500).json(err);
    }
};
