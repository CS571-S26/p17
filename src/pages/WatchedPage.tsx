import type React from "react";
import { useCallback, useState } from "react";
import { getWatched, type WatchedItem, clearWatched } from "../services/storage";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import MovieCard from "../components/MovieCard";

const WatchedPage: React.FC = () => {
    const [items, setItems] = useState<WatchedItem[]>(getWatched());

    const refresh = useCallback(() => {
        setItems(getWatched());
    }, []);

    const clear = () => {
        if (window.confirm("Are you sure you want to clear your watched movies? This action cannot be undone.")) {
            clearWatched();
            refresh();
        }
    };

    return (
        <Container className="py-4">
            <h1 className="mb-2">My Watched Movies</h1>
            <p className="text-secondary mb-4">{items.length} movie{items.length !== 1 ? "s" : ""} watched</p>

            {
                items.length > 0 && 
                    <Button variant="outline-danger" onClick={clear} className="mb-4 mr-0 ml-auto">
                        Clear Watched Movies
                    </Button>
            }

            {
                items.length === 0 ? (
                    <Alert variant="secondary">
                        You haven't marked any movies as watched yet. Browse <a href="#/movies">movies</a> and start tracking your viewing history!
                    </Alert>
                ) : (
                    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                        {items.map((item) => (
                            <Col key={item.movie.id}>
                                <MovieCard movie={item.movie} onListChange={refresh} />
                            </Col>
                        ))}
                    </Row>
                )
            }
        </Container>
    );
};

export default WatchedPage;