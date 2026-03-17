import type React from 'react';
import { Button, Container } from 'react-bootstrap';

const AboutPage: React.FC = () => {
    return (
        <Container style={{ marginTop: '5rem' }}>
            <h1>About</h1>
            <h2>This is a different page</h2>
            <Button variant="secondary" style={{ marginTop: '2rem' }}>This button also does nothing</Button>
        </Container>
    );
};

export default AboutPage;
