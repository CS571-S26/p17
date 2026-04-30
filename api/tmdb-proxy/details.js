import { fetchTMDB } from "./_util.js";

export default async function handler(request, response) {
    const { movieId } = request.query;

    if (!movieId) return response.status(400).json({ error: "'movieId' parameter is required" });

    const res = await fetchTMDB(`/movie/${movieId}`);
    const data = await res.json();
    return response.status(res.status).json(data);
};
