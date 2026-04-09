import type React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";

const team = [
    { name: "Saahil Khatkhate", github: "saahil-khatkhate" },
    { name: "Danial Umirzhanov", github: "TOT-SAMI" },
    { name: "Naheel Mansoor", github: "Naheel10" },
];

const AboutPage: React.FC = () => {
    return (
        <Container className="py-5">
            <h1 className="mb-3">About MovieLog</h1>
            <p className="lead mb-4">
                MovieLog is a web application built for CS571: Building User Interfaces at UW–Madison.
                It lets you browse trending movies, search the TMDB database, and manage a personal watchlist — all stored in your browser.
            </p>

            <h3 className="mb-3">Team — Group 17</h3>
            <Row xs={1} md={3} className="g-4 mb-5">
                {team.map((member) => (
                    <Col key={member.github}>
                        <Card className="bg-dark text-light border-secondary text-center p-3">
                            <Card.Body>
                                <Card.Title>{member.name}</Card.Title>
                                <Card.Text className="text-muted">
                                    <a
                                        href={`https://github.com/${member.github}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-warning"
                                    >
                                        @{member.github}
                                    </a>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <h3 className="mb-3">Tech Stack</h3>
            <ul>
                <li>React + TypeScript</li>
                <li>React Router (HashRouter)</li>
                <li>React Bootstrap</li>
                <li>TMDB API for movie data</li>
                <li>localStorage for watchlist persistence</li>
            </ul>
        </Container>
    );
};

export default AboutPage;
