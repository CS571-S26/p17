import type React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
    return (
        <>
            <Navbar expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">CS571 Web Project</Navbar.Brand>
                    <Nav>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
