import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const NavigationBar = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">movieDB</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink to={"/list"}>Movies</NavLink>
                        <NavLink to={"/add"}>Add</NavLink>
                        <NavLink to={"/wishlist"}>Wishlist</NavLink> 
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
