import { getWatched, getWatchlist } from "./storage";
import { getMovie, searchMovies, type Movie } from "./tmdb";

const MAX_LIST_LENGTH = 10;

interface GeminiRecommendation {
    title: string;
    year: number;
};

const getFormattedData = (): string => {
    const watchlist = getWatchlist();
    const watched = getWatched();

    if (watchlist.length + watched.length < 5) {
        throw new Error("Not enough entries to generate recommendations");
    }

    const watchlistFormatted = watchlist.slice(0, MAX_LIST_LENGTH).reduce((previous, current) => {
        return previous + `- ${current.movie.title} (${new Date(current.movie.release_date).getFullYear()})\n`;
    }, "");

    const watchedFormatted = watched.slice(0, MAX_LIST_LENGTH).reduce((previous, current) => {
        return previous + `- ${current.movie.title} (${new Date(current.movie.release_date).getFullYear()}): ${current.rating}/10\n`;
    }, "");

    return `WATCHLIST (Movies I want to see):\n${watchlistFormatted}\nWATCHED (Movies I've seen and rated):\n${watchedFormatted}`;
};

const getRecommendedMovies = async (recommendations: GeminiRecommendation[]): Promise<Movie[]> => {
    const promises = recommendations.map(async rec => {
        let movieReq = await getMovie(rec.title, rec.year);
        let movieResults = movieReq.results;
        if (movieResults.length === 0) {
            movieReq = await searchMovies(rec.title);
            movieResults = movieReq.results;
        }
        if (movieResults.length > 0) {
            return movieResults[0];
        }
        return null;
    });

    const results = await Promise.all(promises);
    return results.filter(rec => rec !== null);
}

export const recommendationRequest = async (): Promise<Movie[]> => {
    try {
        const formattedData = getFormattedData();
        
        const request = await fetch("/api/gemini-proxy/recommendations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data: formattedData
            })
        });
        const response = await request.json();

        return await getRecommendedMovies(JSON.parse(response) as GeminiRecommendation[]);
    } catch (err) {
        console.error(err);
        return [];
    }
};
