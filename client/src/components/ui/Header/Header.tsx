import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand>😼</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Recent Articles
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/login">
            Log in
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
