import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Pokedex</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Catálogo</Nav.Link>
            <Nav.Link as={Link} to="/lista-pokemon">Lista de Pokémon</Nav.Link>
            <Nav.Link as={Link} to="/lista-habilidades">Lista de Habilidades</Nav.Link>
            <Nav.Link as={Link} to="/lista-tipos">Lista de Tipos</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
