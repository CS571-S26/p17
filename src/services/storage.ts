import type { Movie } from "./tmdb";

export interface WatchlistItem {
    movie: Movie;
    addedAt: number;
};

export interface WatchedItem {
    movie: Movie;
    addedAt: number;
    rating: number;
};

const WATCHLIST_KEY = "movielog_watchlist";
const WATCHED_KEY = "movielog_watched";

export const getWatchlist = (): WatchlistItem[] => {
    const data = localStorage.getItem(WATCHLIST_KEY);
    return data ? JSON.parse(data) : [];
};

export const getWatched = (): WatchedItem[] => {
    const data = localStorage.getItem(WATCHED_KEY);
    return data ? JSON.parse(data) : [];
};

export const addToWatchlist = (movie: Movie): void => {
    const list = getWatchlist();
    if (list.some((item) => item.movie.id === movie.id)) return;
    list.unshift({ movie, addedAt: Date.now() });
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
};

export const addToWatched = (movie: Movie, rating: number): void => {
    const list = getWatched();
    if (list.some((item) => item.movie.id === movie.id)) return;
    list.unshift({ movie, rating, addedAt: Date.now() });
    localStorage.setItem(WATCHED_KEY, JSON.stringify(list));
};

export const removeFromWatchlist = (movieId: number): void => {
    const list = getWatchlist().filter((item) => item.movie.id !== movieId);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
};

export const removeFromWatched = (movieId: number): void => {
    const list = getWatched().filter((item) => item.movie.id !== movieId);
    localStorage.setItem(WATCHED_KEY, JSON.stringify(list));
};

export const isInWatchlist = (movieId: number): boolean => {
    return getWatchlist().some((item) => item.movie.id === movieId);
};

export const isInWatched = (movieId: number): boolean => {
    return getWatched().some((item) => item.movie.id === movieId);
};

export const getWatchedRating = (movieId: number): number | null => {
    const movie = getWatched().filter((item) => item.movie.id === movieId)[0];
    if (!movie || !movie.rating) return null;
    return movie.rating;
};

export const getWatchedDate = (movieId: number): number | null => {
    const movie = getWatched().filter((item) => item.movie.id === movieId)[0];
    if (!movie || !movie.addedAt) return null;
    return movie.addedAt;
};

export const clearWatchlist = (): void => {
    localStorage.removeItem(WATCHLIST_KEY);
};

export const clearWatched = (): void => {
    localStorage.removeItem(WATCHED_KEY);
};
