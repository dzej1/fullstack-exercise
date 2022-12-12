import React from "react";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useUser } from "../../../hooks";

function AdminItems() {
  const { isAdmin } = useUser();
  return isAdmin ? (
    <>
      <NavDropdown.Item as={Link} to="/new-article">
        New Article
      </NavDropdown.Item>
      <NavDropdown.Item>My Articles</NavDropdown.Item>
      <NavDropdown.Divider></NavDropdown.Divider>
    </>
  ) : null;
}

export default AdminItems;
