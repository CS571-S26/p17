const API_KEY = "86be8ea00274c43b87aecb619ddab3d7";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p";

export const getImageUrl = (path: string | null, size = "w500"): string => {
    if (!path) return "https://placehold.co/500x750?text=No+Image";
    return `${IMG_BASE}/${size}${path}`;
};

async function fetchTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const searchParams = new URLSearchParams({ api_key: API_KEY, ...params });
    const res = await fetch(`${BASE_URL}${endpoint}?${searchParams}`);
    if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
    return res.json();
}

export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
    popularity: number;
}

export interface PaginatedResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

export const getTrendingMovies = (page = 1) =>
    fetchTMDB<PaginatedResponse<Movie>>("/trending/movie/week", { page: String(page) });

export const searchMovies = (query: string, page = 1) =>
    fetchTMDB<PaginatedResponse<Movie>>("/search/movie", { query, page: String(page) });
