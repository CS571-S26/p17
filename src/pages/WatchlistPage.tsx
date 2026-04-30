import type React from "react";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import { useState, useCallback } from "react";
import { getWatchlist, clearWatchlist, getWatched } from "../services/storage";
import MovieCard from "../components/MovieCard";
import RecommendationModal from "../components/RecommendationModal";

const WatchlistPage: React.FC = () => {
    const [items, setItems] = useState(getWatchlist());
    const [showRecommendations, setShowRecommendations] = useState(false);

    const refresh = useCallback(() => {
        setItems(getWatchlist());
    }, []);

    const clear = () => {
        if (window.confirm("Are you sure you want to clear your watchlist? This action cannot be undone.")) {
            clearWatchlist();
            refresh();
        }
    };

    const openRecommendationModal = () => setShowRecommendations(true);
    const closeRecommendationModal = () => setShowRecommendations(false);

    return (
        <>
            <Container className="py-4">
                <h1 className="mb-2">My Watchlist</h1>
                <p className="text-secondary mb-4">{items.length} movie{items.length !== 1 ? "s" : ""} saved</p>

                <div className="mb-4 d-flex justify-content-between">
                    <Button variant="outline-danger" onClick={clear} disabled={items.length === 0}>
                        Clear Watchlist
                    </Button>
                    <Button variant="success" onClick={openRecommendationModal} disabled={items.length + getWatched().length < 5}>
                        Recommend Movies
                    </Button>
                </div>

                {items.length === 0 ? (
                    <Alert variant="secondary">
                        Your watchlist is empty. Browse <a href="#/movies">movies</a> and add some!
                    </Alert>
                ) : (
                    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                        {items.map((item) => (
                            <Col key={item.movie.id}>
                                <MovieCard movie={item.movie} onListChange={refresh} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
            <RecommendationModal
                show={showRecommendations}
                onHide={closeRecommendationModal}
                onListChange={refresh}
            />
        </>
    );
};

export default WatchlistPage;
