import type { Movie } from "./tmdb";

export interface WatchlistItem {
    movie: Movie;
    addedAt: number;
}

const WATCHLIST_KEY = "movielog_watchlist";

export const getWatchlist = (): WatchlistItem[] => {
    const data = localStorage.getItem(WATCHLIST_KEY);
    return data ? JSON.parse(data) : [];
};

export const addToWatchlist = (movie: Movie): void => {
    const list = getWatchlist();
    if (list.some((item) => item.movie.id === movie.id)) return;
    list.unshift({ movie, addedAt: Date.now() });
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
};

export const removeFromWatchlist = (movieId: number): void => {
    const list = getWatchlist().filter((item) => item.movie.id !== movieId);
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
};

export const isInWatchlist = (movieId: number): boolean => {
    return getWatchlist().some((item) => item.movie.id === movieId);
};

export const clearWatchlist = (): void => {
    localStorage.removeItem(WATCHLIST_KEY);
};
