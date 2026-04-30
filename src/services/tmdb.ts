const BASE_URL = "/api/tmdb-proxy";
const IMG_BASE = "https://image.tmdb.org/t/p";

export const getImageUrl = (path: string | null, size = "w500"): string => {
    if (!path) return "https://placehold.co/500x750?text=No+Image";
    return `${IMG_BASE}/${size}${path}`;
};

async function fetchTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const searchParams = new URLSearchParams(params);
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

export const getMovieDetails = async (movieId: number) =>
    fetchTMDB<MovieDetails>("/details", { movieId: String(movieId) });

export const getTrendingMovies = () =>
    fetchTMDB<PaginatedResponse<Movie>>("/trending");

export const searchMovies = (query: string, page = 1) =>
    fetchTMDB<PaginatedResponse<Movie>>("/search", { title: query, page: String(page) });

export const getMovie = (title: string, year: number) =>
    fetchTMDB<PaginatedResponse<Movie>>("/search", { title, year: String(year) });

export const getPopularMovies = (page = 1) =>
    fetchTMDB<PaginatedResponse<Movie>>("/popular", { page: String(page) });

export const getTopRatedMovies = (page = 1) =>
    fetchTMDB<PaginatedResponse<Movie>>("/top-rated", { page: String(page) });

export const getNowPlayingMovies = (page = 1) =>
    fetchTMDB<PaginatedResponse<Movie>>("/now-playing", { page: String(page) });

export const getUpcomingMovies = (page = 1) =>
    fetchTMDB<PaginatedResponse<Movie>>("/upcoming", { page: String(page) });
