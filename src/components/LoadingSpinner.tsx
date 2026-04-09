import type React from "react";
import { Spinner, Container } from "react-bootstrap";

interface LoadingSpinnerProps {
    message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = "Loading..." }) => {
    return (
        <Container className="text-center py-5">
            <Spinner animation="border" variant="warning" />
            <p className="text-muted mt-2">{message}</p>
        </Container>
    );
};

export default LoadingSpinner;
