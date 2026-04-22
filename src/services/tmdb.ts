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

export interface MovieDetails extends Movie {
    genres: Array<{ id: number; name: string }>;
    runtime: number | null;
    tagline: string;
    status: string;
    homepage: string;
    original_language: string;
    budget: number;
    revenue: number;
    production_companies: Array<{
        id: number;
        name: string;
        logo_path: string | null;
        origin_country: string;
    }>;
    production_countries: Array<{
        iso_3166_1: string;
        name: string;
    }>;
    spoken_languages: Array<{
        english_name: string;
        iso_639_1: string;
        name: string;
    }>;
}

export interface PaginatedResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

export const getMovieDetails = (movieId: number) =>
    fetchTMDB<MovieDetails>(`/movie/${movieId}`);

export const getTrendingMovies = (page = 1) =>
    fetchTMDB<PaginatedResponse<Movie>>("/trending/movie/week", { page: String(page) });

export const searchMovies = (query: string, page = 1) =>
    fetchTMDB<PaginatedResponse<Movie>>("/search/movie", { query, page: String(page) });

export const getPopularMovies = (page = 1) =>
    fetchTMDB<PaginatedResponse<Movie>>("/movie/popular", { page: String(page) });

export const getTopRatedMovies = (page = 1) =>
    fetchTMDB<PaginatedResponse<Movie>>("/movie/top_rated", { page: String(page) });

export const getNowPlayingMovies = (page = 1) =>
    fetchTMDB<PaginatedResponse<Movie>>("/movie/now_playing", { page: String(page) });

export const getUpcomingMovies = (page = 1) =>
    fetchTMDB<PaginatedResponse<Movie>>("/movie/upcoming", { page: String(page) });
