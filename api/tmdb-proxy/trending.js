import { fetchTMDB } from "./_util.js";

export default async function handler(request, response) {
    const res = await fetchTMDB("/trending/movie/week");
    const data = await res.json();
    return response.status(res.status).json(data);
};
