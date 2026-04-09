import type React from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTrendingMovies, getImageUrl, type Movie } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";

const HomePage: React.FC = () => {
    const [trending, setTrending] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getTrendingMovies()
            .then((data) => setTrending(data.results.slice(0, 8)))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <LoadingSpinner message="Loading trending movies..." />;

    if (error)
        return (
            <Container className="py-5">
                <Alert variant="danger">
                    Failed to load movies: {error}
                    <br />
                    <small>Make sure you've set your TMDB API key in <code>src/services/tmdb.ts</code></small>
                </Alert>
            </Container>
        );

    const hero = trending[0];

    return (
        <>
            {/* Hero banner */}
            {hero && (
                <div
                    style={{
                        position: "relative",
                        height: "50vh",
                        backgroundImage: `url(${getImageUrl(hero.backdrop_path, "original")})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center top",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to top, #1a1a2e 0%, rgba(26,26,46,0.5) 60%, rgba(26,26,46,0.2) 100%)",
                        }}
                    />
                    <Container className="position-relative h-100 d-flex flex-column justify-content-end pb-4">
                        <h1 className="text-white fw-bold display-5">{hero.title}</h1>
                        <p className="text-light mb-3" style={{ maxWidth: 550 }}>
                            {hero.overview?.slice(0, 180)}{hero.overview?.length > 180 ? "..." : ""}
                        </p>
                        <Link to="/movies" className="btn btn-warning">
                            Browse All Movies
                        </Link>
                    </Container>
                </div>
            )}

            <Container className="py-4">
                <h2 className="mb-4">🔥 Trending This Week</h2>
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {trending.map((movie) => (
                        <Col key={movie.id}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default HomePage;
