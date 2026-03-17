import type React from 'react';
import { Button, Container } from 'react-bootstrap';

const HomePage: React.FC = () => {
    return (
        <Container style={{ marginTop: '5rem' }}>
            <h1>CS571 Web Project</h1>
            <h2>Group 17</h2>
            <Button variant="primary" style={{ marginTop: '2rem' }}>This button does nothing</Button>
        </Container>
    );
};

export default HomePage;
