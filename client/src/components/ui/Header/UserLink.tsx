import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import Avatar from "../Avatar/Avatar";
import { useUser } from "../../../hooks";

function Header() {
  const { isLogged, username, logout } = useUser();
  return isLogged && username ? (
    <NavDropdown
      title={
        <>
          <Avatar username={username} />
          <span>{username}</span>
        </>
      }
    >
      <NavDropdown.Item>Profile</NavDropdown.Item>
      <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
    </NavDropdown>
  ) : (
    <Nav.Link as={Link} to="/login">
      Log in
    </Nav.Link>
  );
}

export default Header;
