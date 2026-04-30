import { fetchTMDB } from "./_util";

export default async function handler(request, response) {
    const res = await fetchTMDB("/trending/movie/week");
    return response.status(res.status).json(res.json());
};
