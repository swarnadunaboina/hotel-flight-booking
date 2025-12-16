import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaPlane, FaHotel, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { currentUser, logOut } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };
  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <FaPlane className="me-2" /> TravelBook
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/hotels">
                <Nav.Link>
                  <FaHotel className="me-1" /> Hotels
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/flights">
                <Nav.Link>
                  <FaPlane className="me-1" /> Flights
                </Nav.Link>
              </LinkContainer>
              {currentUser ? (
                <NavDropdown title={<><FaUser className="me-1" /> {currentUser.displayName || currentUser.email}</>} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/booking-history">
                    <NavDropdown.Item>Booking History</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <FaSignOutAlt className="me-1" /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown title={<><FaUser className="me-1" /> Account</>} id="username">
                  <LinkContainer to="/login">
                    <NavDropdown.Item>Login</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <NavDropdown.Item>Register</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
