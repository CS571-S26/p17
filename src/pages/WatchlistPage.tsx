import type React from "react";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import { useState, useCallback } from "react";
import { getWatchlist, clearWatchlist } from "../services/storage";
import MovieCard from "../components/MovieCard";

const WatchlistPage: React.FC = () => {
    const [items, setItems] = useState(getWatchlist());

    const refresh = useCallback(() => {
        setItems(getWatchlist());
    }, []);

    const clear = () => {
        if (window.confirm("Are you sure you want to clear your watchlist? This action cannot be undone.")) {
            clearWatchlist();
            refresh();
        }
    };

    return (
        <Container className="py-4">
            <h1 className="mb-2">My Watchlist</h1>
            <p className="text-secondary mb-4">{items.length} movie{items.length !== 1 ? "s" : ""} saved</p>

            {
                items.length > 0 && 
                    <Button variant="outline-danger" onClick={clear} className="mb-4 mr-0 ml-auto">
                        Clear Watchlist
                    </Button>
            }

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
