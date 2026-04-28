import { Rating, Star } from '@smastrom/react-rating';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { getWatchedDate } from '../services/storage';

interface RatingModalProps {
    movieTitle: string;
    movieId: number;
    inWatchlist: boolean;
    show: boolean;
    onHide: () => void;
    onRate: (rating: number) => void;
    onRemove: () => void;
    previousRating: number | null;
};

const RatingModal: React.FC<RatingModalProps> = ({ movieTitle, movieId, inWatchlist, show, onHide, onRate, onRemove, previousRating }) => {
    const initialRating = previousRating ?? 0;
    const [rating, setRating] = useState(initialRating);
    const [dateRated, setDateRated] = useState(getWatchedDate(movieId));

    useEffect(() => {
        setRating(initialRating);
        setDateRated(getWatchedDate(movieId));
    }, [show])

    return (
        <Modal show={show} onHide={onHide} contentClassName="bg-dark text-white" centered id="rating-modal">
            <Modal.Header closeButton closeVariant="white">
                <Modal.Title>Rate <em>{movieTitle}</em></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>How would you rate this movie?</p>
                <Rating
                    value={rating}
                    onChange={setRating}
                    style={{ maxWidth: "70%" }}
                    itemStyles={{
                        itemShapes: Star,
                        inactiveFillColor: "#ffedd5",
                        activeFillColor: "#f59e0b"
                    }}
                    items={10}
                />
                {
                    previousRating && dateRated && (
                        <p className="text-secondary mt-3 mb-auto">
                            Previous rating from {
                                new Date(dateRated).toLocaleDateString(undefined, {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })
                            }
                        </p>
                    )
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Cancel</Button>
                {
                    previousRating &&
                        <Button variant="danger" onClick={onRemove}>
                            Remove from Watched
                        </Button>
                }
                <Button variant="success" disabled={rating === initialRating || rating === 0} onClick={() => onRate(rating)}>
                    {
                        previousRating ? `Update Rating` :
                            `Rate ${inWatchlist ? "& Remove from Watchlist" : ""}`
                    }
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RatingModal;