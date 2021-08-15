import { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import AuthContext from "../../store/AuthContext";
import BookSlotContext from "../../store/BookSlotContext"

function MainNavigation() {
  const authCtx = useContext(AuthContext);
  const bookSlotCtx = useContext(BookSlotContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const isAdmin = authCtx.role === "Admin";

  const logoutHandler = () => {
    authCtx.logout();
    bookSlotCtx.cleanAllSlot();
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="navbar-static-top"
    >
      <Container>
        <Navbar.Brand href="/">ROBS</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {isLoggedIn && <Nav.Link href="/my-bookings">My Bookings</Nav.Link>}
            {isLoggedIn && <Nav.Link href="/new-booking">New Booking</Nav.Link>}
            {isLoggedIn && <Nav.Link href="/my-profile">My Profile</Nav.Link>}
            {isLoggedIn && isAdmin && (
              <Nav.Link href="/management">Management</Nav.Link>
            )}
          </Nav>
          <Nav>
            {!isLoggedIn && <Nav.Link href="/login">Login</Nav.Link>}
            {!isLoggedIn && <Nav.Link href="/signup">Signup</Nav.Link>}
            {isLoggedIn && (
              <Button variant="dark" onClick={logoutHandler}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}

export default MainNavigation;
