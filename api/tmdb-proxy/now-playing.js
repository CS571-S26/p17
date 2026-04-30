import { fetchTMDB } from "./_util";

export default async function handler(request, response) {
    const { page } = request.query;

    const res = await fetchTMDB("/movie/now_playing", { page });
    return response.status(res.status).json(res.json());
};
