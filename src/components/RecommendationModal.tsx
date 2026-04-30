import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { recommendationRequest } from "../services/recommendation";
import LoadingSpinner from "./LoadingSpinner";
import MovieCard from "./MovieCard";
import type { Movie } from "../services/tmdb";

interface RecommendationModalProps {
    show: boolean;
    onHide: () => void;
    onListChange: () => void;
};

const RecommendationModal: React.FC<RecommendationModalProps> = ({ show, onHide, onListChange }) => {
    const [recommendations, setRecommendations] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        refresh();
    }, []);

    const refresh = () => {
        setLoading(true);
        setError(false);
        recommendationRequest().then(results => {
            setRecommendations(results);
            setLoading(false);
            if (results.length === 0) {
                setError(true);
            }
        });
    };

    const updateList = (movieId: number): void => {
        onListChange();
        setRecommendations(recs => {
            return recs.filter(rec => rec.id !== movieId);
        });
    };

    return (
        <Modal show={show} onHide={onHide} centered contentClassName="bg-dark text-white" size="xl" id="recommendation-modal">
            <Modal.Header closeButton closeVariant="white">
                <Modal.Title>Recommendations</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    loading ? <LoadingSpinner /> : 
                    error ? (
                        <p className="text-danger">Something went wrong with the recommendation service. Please try again later.</p>
                    ) : (
                        <Container className="px-5">
                            <Row xs={1} lg={2} xl={3} className="g-4">
                                {recommendations.map(rec => (
                                    <Col key={rec.id}>
                                        <MovieCard movie={rec} onListChange={() => updateList(rec.id)} />
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    )
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={refresh} disabled={loading}>
                    Refresh Recommendations
                </Button>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RecommendationModal;
