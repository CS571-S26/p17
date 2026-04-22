import type React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";

const Layout: React.FC = () => {
    const location = useLocation();

    return (
        <>
            <Navbar expand="lg" bg="dark" variant="dark" sticky="top" className="shadow-sm">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="fw-bold">
                        🎬 MovieLog
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="main-nav" />
                    <Navbar.Collapse id="main-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/" active={location.pathname === "/"}>
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/movies" active={location.pathname === "/movies"}>
                                Movies
                            </Nav.Link>
                            <Nav.Link as={Link} to="/watchlist" active={location.pathname === "/watchlist"}>
                                Watchlist
                            </Nav.Link>
                            <Nav.Link as={Link} to="/about" active={location.pathname === "/about"}>
                                About
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <main style={{ minHeight: "calc(100vh - 120px)", backgroundColor: "#1a1a2e", color: "#eee" }}>
                <Outlet />
            </main>

            <footer className="bg-dark text-light text-center py-3">
                <small>CS571 Web Project — Group 17 — Movie Log Platform</small>
            </footer>
        </>
    );
};

export default Layout;
