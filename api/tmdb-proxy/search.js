import { fetchTMDB } from "./_util";

export default async function handler(request, response) {
    const { title, year, page } = request.query;

    if (!title) return response.status(400).json({ error: "'title' parameter is required" });

    let res;

    if (!year) {
        res = await fetchTMDB("/search/movie", { query: title, page: page });
    } else {
        res = await fetchTMDB("/search/movie", { query: title, primary_release_year: year });
    }

    return response.status(res.status).json(res.json());
};
