const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function fetchTMDB(endpoint, params = {}) {
    const searchParams = new URLSearchParams({ api_key: TMDB_API_KEY, ...params });
    return await fetch(`${TMDB_BASE_URL}${endpoint}?${searchParams}`);
};
