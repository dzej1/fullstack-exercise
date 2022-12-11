import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import UserLink from "./UserLink";

function Header() {
  return (
    <Navbar bg="light" sticky="top">
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
          <UserLink />
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
