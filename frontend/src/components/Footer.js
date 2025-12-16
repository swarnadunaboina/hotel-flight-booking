import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <Container fluid className="footer">
        <Row>
          <Col md={4} className="mb-4">
            <h5 className="footer-title">TravelBook</h5>
            <p>Your one-stop solution for hotel and flight bookings. Find the best deals and make your travel dreams come true.</p>
          </Col>
          <Col md={2} className="mb-4">
            <h5 className="footer-title">Quick Links</h5>
            <Link to="/" className="footer-link d-block">Home</Link>
            <Link to="/hotels" className="footer-link d-block">Hotels</Link>
            <Link to="/flights" className="footer-link d-block">Flights</Link>
            <Link to="/booking-history" className="footer-link d-block">My Bookings</Link>
          </Col>
          <Col md={2} className="mb-4">
            <h5 className="footer-title">Account</h5>
            <Link to="/profile" className="footer-link d-block">My Profile</Link>
            <Link to="/login" className="footer-link d-block">Login</Link>
            <Link to="/register" className="footer-link d-block">Register</Link>
            <Button variant="link" className="footer-link p-0">Help Center</Button>
          </Col>
          <Col md={4} className="mb-4">
            <h5 className="footer-title">Contact Us</h5>
            <p>Email: support@travelbook.com</p>
            <p>Phone: +1 (123) 456-7890</p>
            <p>Address: 123 Travel Street, Journey City, TC 12345</p>
          </Col>
        </Row>
        <hr className="my-4" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
        <Row>
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} TravelBook. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
