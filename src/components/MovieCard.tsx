import type React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { getImageUrl, type Movie } from "../services/tmdb";
import { isInWatchlist, addToWatchlist, removeFromWatchlist } from "../services/storage";
import { useState } from "react";

interface MovieCardProps {
    movie: Movie;
    onListChange?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onListChange }) => {
    const [inWatchlist, setInWatchlist] = useState(isInWatchlist(movie.id));

    const handleToggle = () => {
        if (inWatchlist) {
            removeFromWatchlist(movie.id);
            setInWatchlist(false);
        } else {
            addToWatchlist(movie);
            setInWatchlist(true);
        }
        onListChange?.();
    };

    const ratingColor =
        movie.vote_average >= 7 ? "success" : movie.vote_average >= 5 ? "warning" : "danger";

    return (
        <Card className="h-100 bg-dark text-light border-secondary shadow-sm">
            <div style={{ position: "relative" }}>
                <Card.Img
                    variant="top"
                    src={getImageUrl(movie.poster_path, "w342")}
                    alt={movie.title}
                    style={{ height: 380, objectFit: "cover" }}
                />
                <Badge
                    bg={ratingColor}
                    style={{ position: "absolute", top: 8, right: 8, fontSize: "0.85rem" }}
                >
                    ⭐ {movie.vote_average.toFixed(1)}
                </Badge>
            </div>
            <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-6">{movie.title}</Card.Title>
                <Card.Text className="text-muted small flex-grow-1">
                    {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
                    {" · "}
                    {movie.overview?.slice(0, 80)}
                    {movie.overview?.length > 80 ? "..." : ""}
                </Card.Text>
                <Button
                    size="sm"
                    variant={inWatchlist ? "warning" : "outline-warning"}
                    onClick={handleToggle}
                    className="mt-auto"
                >
                    {inWatchlist ? "★ In Watchlist" : "☆ Add to Watchlist"}
                </Button>
            </Card.Body>
        </Card>
    );
};

export default MovieCard;
