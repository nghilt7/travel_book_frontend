import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { NavLink, Link } from "react-router-dom";
import { postLogout } from "../../services/apiServices";

import "./Header.scss";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/reducer/User/user.actions";

function Header() {
  // hooke
  const navigate = useNavigate();

  // redux
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const handleLogout = async () => {
    let res = await postLogout();
    if (res && +res.EC === 0) {
      toast.success("Logout successfully");
      dispatch(doLogout());
      navigate("/");
    } else {
      toast.error(res.EM);
    }
  };

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
                <NavLink
                  className="nav-link"
                  to="/logout"
                  onClick={() => handleLogout()}
                >
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
