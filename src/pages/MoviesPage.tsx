import type React from "react";
import { useEffect, useState } from "react";
import { Col, Container, DropdownButton, DropdownItem, Row } from "react-bootstrap";
import LoadingSpinner from "../components/LoadingSpinner";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import {
    getNowPlayingMovies,
    getPopularMovies, 
    getTopRatedMovies, 
    getUpcomingMovies, 
    searchMovies, 
    type Movie
} from "../services/tmdb";

type MovieSortCategory = "Popular" | "Top Rated" | "Now Playing" | "Upcoming";

const MoviesPage: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortCategory, setSortCategory] = useState<MovieSortCategory>("Popular");

    const fetchMovies = async (searchQuery: string, p: number, category: MovieSortCategory) => {
        setLoading(true);
        try {
            const data = searchQuery
                ? await searchMovies(searchQuery, p)
                : await fetchCategoryMovies(category, p);
            setMovies(data.results);
            setTotalPages(data.total_pages);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategoryMovies = async (category: MovieSortCategory, p: number) => {
        switch (category) {
            default: case "Popular":
                return await getPopularMovies(p);
            case "Top Rated":
                return await getTopRatedMovies(p);
            case "Now Playing":
                return await getNowPlayingMovies(p);
            case "Upcoming":
                return await getUpcomingMovies(p);
        }
    }

    useEffect(() => {
        fetchMovies(query, page, sortCategory);
    }, [query, page, sortCategory]);

    const handleSearch = (q: string) => {
        setQuery(q);
        setPage(1);
    };

    const handlePageChange = (p: number) => {
        setPage(p);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSortChange = (category: MovieSortCategory) => {
        setSortCategory(category);
        setPage(1);
    }

    return (
        <Container className="py-4">
            <h1 className="mb-4">{query ? `Results for "${query}"` : "Browse Movies"}</h1>

            <div className="mb-4 d-flex justify-content-between">
                <SearchBar onSearch={handleSearch} placeholder="Search for movies..." activeQuery={!!query} />
                {
                    !query &&
                        <DropdownButton
                            title={"Category: " + sortCategory}
                            onSelect={(eventKey) => handleSortChange(eventKey as MovieSortCategory)}
                            variant="success"
                        >
                            <DropdownItem eventKey={"Popular"}>Popular</DropdownItem>
                            <DropdownItem eventKey={"Top Rated"}>Top Rated</DropdownItem>
                            <DropdownItem eventKey={"Now Playing"}>Now Playing</DropdownItem>
                            <DropdownItem eventKey={"Upcoming"}>Upcoming</DropdownItem>
                        </DropdownButton>
                }
            </div>

            {loading ? (
                <LoadingSpinner />
            ) : movies.length === 0 ? (
                <p className="text-secondary">No movies found. Try a different search.</p>
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
