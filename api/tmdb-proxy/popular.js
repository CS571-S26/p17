import { fetchTMDB } from "./_util.js";

export default async function handler(request, response) {
    const { page } = request.query;

    const res = await fetchTMDB("/movie/popular", { page });
    const data = await res.json();
    return response.status(res.status).json(data);
};
