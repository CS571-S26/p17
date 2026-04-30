import { fetchTMDB } from "./_util.js";

export default async function handler(request, response) {
    const { page } = request.query;

    const res = await fetchTMDB("/movie/now_playing", { page });
    const data = await res.json();
    return response.status(res.status).json(data);
};
