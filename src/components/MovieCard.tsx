import type React from "react";
import { useState } from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { getImageUrl, type Movie } from "../services/tmdb";
import { isInWatchlist, addToWatchlist, removeFromWatchlist, removeFromWatched, addToWatched, isInWatched, getWatchedRating } from "../services/storage";
import MovieModal from "./MovieModal";
import RatingModal from "./RatingModal";

interface MovieCardProps {
    movie: Movie;
    onListChange?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onListChange }) => {
    const [inWatchlist, setInWatchlist] = useState(isInWatchlist(movie.id));
    const [inWatched, setInWatched] = useState(isInWatched(movie.id));
    const [showModal, setShowModal] = useState(false);
    const [userRating, setUserRating] = useState(getWatchedRating(movie.id));
    const [showRateModal, setShowRateModal] = useState(false);

    const handleWatchlistToggle = () => {
        if (inWatchlist) {
            removeFromWatchlist(movie.id);
            setInWatchlist(false);
        } else {
            if (inWatched) {
                removeFromWatched(movie.id);
                setInWatched(false);
                setUserRating(null);
            }
            addToWatchlist(movie);
            setInWatchlist(true);
        }
        onListChange?.();
    };

    const handleRate = (rating: number) => {
        setUserRating(rating);
        if (inWatchlist) {
            removeFromWatchlist(movie.id);
            setInWatchlist(false);
        }
        removeFromWatched(movie.id);
        addToWatched(movie, rating);
        setInWatched(true);
        closeRateModal();
        onListChange?.();
    };

    const removeRate = () => {
        removeFromWatched(movie.id);
        setInWatched(false);
        closeRateModal();
        setUserRating(null);
        onListChange?.();
    }

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const openRateModal = () => setShowRateModal(true);
    const closeRateModal = () => setShowRateModal(false);

    const ratingColor =
        movie.vote_average >= 7 ? "success" : movie.vote_average >= 5 ? "warning" : "danger";

    return (
        <>
            <Card
                className="h-100 bg-dark text-light border-secondary shadow-sm"
                onClick={openModal}
                style={{ cursor: "pointer" }}
                tabIndex={0}
                onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        openModal();
                    }
                }}
                role="button"
            >
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
                    <Card.Text className="small flex-grow-1">
                        {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
                        {" · "}
                        {movie.overview?.slice(0, 80)}
                        {movie.overview?.length > 80 ? "..." : ""}
                    </Card.Text>
                    <Button
                        size="sm"
                        variant={inWatchlist ? "warning" : "outline-warning"}
                        onClick={(event) => {
                            event.stopPropagation();
                            handleWatchlistToggle();
                        }}
                        className="mt-auto mb-2"
                    >
                        {
                            inWatchlist ? "★ In Watchlist" : 
                                inWatched ? "Switch to Watchlist" : "☆ Add to Watchlist"
                        }
                    </Button>
                    <Button
                        size="sm"
                        variant={inWatched ? "warning" : "outline-warning"}
                        onClick={(event) => {
                            event.stopPropagation();
                            openRateModal();
                        }}
                    >
                        {
                            inWatched ? `Rated ${userRating}/10` :
                                inWatchlist ? "Already Watched?" : "Rate"
                        }
                    </Button>
                </Card.Body>
            </Card>
            <MovieModal
                movie={movie}
                movieId={movie.id}
                show={showModal}
                onHide={closeModal}
                onWatchlistToggle={handleWatchlistToggle}
                handleRate={openRateModal}
                userRating={userRating}
                inWatchlist={inWatchlist}
                inWatched={inWatched}
            />
            <RatingModal
                movieTitle={movie.title}
                movieId={movie.id}
                inWatchlist={inWatchlist}
                show={showRateModal}
                onHide={closeRateModal}
                onRate={handleRate}
                onRemove={removeRate}
                previousRating={userRating}
            />
        </>
    );
};

export default MovieCard;
