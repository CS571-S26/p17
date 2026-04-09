import type React from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { useState, useCallback } from "react";
import { getWatchlist } from "../services/storage";
import MovieCard from "../components/MovieCard";

const WatchlistPage: React.FC = () => {
    const [items, setItems] = useState(getWatchlist());

    const refresh = useCallback(() => {
        setItems(getWatchlist());
    }, []);

    return (
        <Container className="py-4">
            <h1 className="mb-2">My Watchlist</h1>
            <p className="text-muted mb-4">{items.length} movie{items.length !== 1 ? "s" : ""} saved</p>

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
    );
};

export default WatchlistPage;
