import type React from "react";
import { useEffect, useState } from "react";
import { Modal, Button, Badge, Image, Row, Col, Stack, Alert } from "react-bootstrap";
import { getImageUrl, getMovieDetails, type Movie, type MovieDetails } from "../services/tmdb";
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from "../services/storage";
import LoadingSpinner from "./LoadingSpinner";

interface MovieModalProps {
    movie: Movie;
    movieId: number;
    show: boolean;
    onHide: () => void;
    onListChange?: () => void;
    onWatchlistToggle?: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, movieId, show, onHide, onListChange, onWatchlistToggle }) => {
    const [details, setDetails] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isSaved, setIsSaved] = useState(isInWatchlist(movieId));

    useEffect(() => {
        if (show) {
            setIsSaved(isInWatchlist(movieId));
        }
    }, [show, movieId]);

    useEffect(() => {
        if (!show) return;

        let cancelled = false;
        setLoading(true);
        setError("");

        getMovieDetails(movieId)
            .then((data) => {
                if (!cancelled) setDetails(data);
            })
            .catch((err) => {
                if (!cancelled) setError(err.message || "Failed to load movie details.");
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [show, movieId]);

    const handleToggle = () => {
        if (onWatchlistToggle) {
            onWatchlistToggle();
            setIsSaved((prev) => !prev);
        } else {
            if (isSaved) {
                removeFromWatchlist(movieId);
                setIsSaved(false);
            } else {
                addToWatchlist(movie);
                setIsSaved(true);
            }
        }
        onListChange?.();
    };

    const genres = details?.genres?.map((genre) => genre.name).join(", ");
    const runtime = details?.runtime ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m` : null;
    const productionCompanies = details?.production_companies?.map((company) => company.name).join(", ");
    const productionCountries = details?.production_countries?.map((country) => country.name).join(", ");
    const languages = details?.spoken_languages?.map((language) => language.english_name || language.name).join(", ");
    const budget = details?.budget ? details.budget.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }) : null;
    const revenue = details?.revenue ? details.revenue.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }) : null;
    const poster = getImageUrl(details?.poster_path ?? movie.poster_path, "w500");

    return (
        <Modal show={show} onHide={onHide} size="lg" centered contentClassName="bg-dark text-light">
            <Modal.Header closeButton closeVariant="white">
                <Modal.Title>{movie.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <LoadingSpinner message="Loading movie details..." />
                ) : error ? (
                    <Alert variant="danger">{error}</Alert>
                ) : (
                    <>
                        <Row className="g-4">
                            <Col md={4}>
                                <Image src={poster} alt={movie.title} fluid rounded />
                            </Col>
                            <Col md={8}>
                                <Stack gap={2}>
                                    {details?.tagline && <em>{details.tagline}</em>}
                                    <div>
                                        <Badge bg="warning" text="dark" className="me-2">
                                            {details?.status ?? "Movie"}
                                        </Badge>
                                        <Badge bg="secondary">
                                            {movie.release_date
                                                ? new Date(movie.release_date).toLocaleDateString(undefined, {
                                                      year: "numeric",
                                                      month: "short",
                                                      day: "numeric",
                                                  })
                                                : "Release date unknown"}
                                        </Badge>
                                    </div>
                                    <p>{details?.overview ?? movie.overview}</p>
                                    <div className="d-flex flex-wrap gap-2 mb-2">
                                        <Badge bg="info">⭐ {movie.vote_average.toFixed(1)}</Badge>
                                        <Badge bg="secondary">{movie.vote_count.toLocaleString()} votes</Badge>
                                        {runtime && <Badge bg="secondary">{runtime}</Badge>}
                                        {genres && <Badge bg="secondary">{genres}</Badge>}
                                    </div>
                                    {productionCompanies && (
                                        <div>
                                            <strong>Produced By:</strong> {productionCompanies}
                                        </div>
                                    )}
                                    {productionCountries && (
                                        <div>
                                            <strong>Country:</strong> {productionCountries}
                                        </div>
                                    )}
                                    {languages && (
                                        <div>
                                            <strong>Language:</strong> {languages}
                                        </div>
                                    )}
                                    <div className="d-flex flex-wrap gap-2 my-3">
                                        {budget && (
                                            <Badge bg="success">Budget: {budget}</Badge>
                                        )}
                                        {revenue && (
                                            <Badge bg="success">Revenue: {revenue}</Badge>
                                        )}
                                    </div>
                                    {details?.homepage && (
                                        <a href={details.homepage} target="_blank" rel="noreferrer" className="text-warning">
                                            Visit the official site
                                        </a>
                                    )}
                                </Stack>
                            </Col>
                        </Row>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer className="border-top border-secondary">
                <Button variant={isSaved ? "warning" : "outline-warning"} onClick={handleToggle}>
                    {isSaved ? "★ Remove from Watchlist" : "☆ Add to Watchlist"}
                </Button>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MovieModal;
