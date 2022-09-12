import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";

import { NavLink, Link } from "react-router-dom";

import "./Header.scss";

function Header() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="header-container">
      <Navbar bg="light" expand="lg">
        <Container>
          <Link className="navbar-brand" to="/">
            Tannghi
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link" to="/trip">
                Trip
              </NavLink>
            </Nav>
          </Navbar.Collapse>
          <Nav className="ms-auto d-none d-lg-inline-flex">
            {isAuthenticated ? (
              <>
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
              </>
            ) : (
              <>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
