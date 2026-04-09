import type React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getTrendingMovies, searchMovies, type Movie } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";

const MoviesPage: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchMovies = async (searchQuery: string, p: number) => {
        setLoading(true);
        try {
            const data = searchQuery
                ? await searchMovies(searchQuery, p)
                : await getTrendingMovies(p);
            setMovies(data.results);
            setTotalPages(data.total_pages);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies(query, page);
    }, [query, page]);

    const handleSearch = (q: string) => {
        setQuery(q);
        setPage(1);
    };

    const handlePageChange = (p: number) => {
        setPage(p);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Container className="py-4">
            <h1 className="mb-4">{query ? `Results for "${query}"` : "Browse Movies"}</h1>

            <div className="mb-4" style={{ maxWidth: 500 }}>
                <SearchBar onSearch={handleSearch} placeholder="Search for movies..." />
            </div>

            {loading ? (
                <LoadingSpinner />
            ) : movies.length === 0 ? (
                <p className="text-muted">No movies found. Try a different search.</p>
            ) : (
                <>
                    <Row xs={1} sm={2} md={3} lg={4} className="g-4 mb-4">
                        {movies.map((movie) => (
                            <Col key={movie.id}>
                                <MovieCard movie={movie} />
                            </Col>
                        ))}
                    </Row>
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
                </>
            )}
        </Container>
    );
};

export default MoviesPage;
