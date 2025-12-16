import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaHotel, FaPlane, FaShieldAlt, FaHeadset, FaMoneyBillWave, FaGlobeAmericas } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';

const Home = () => {
  return (
    <>
      <div className="hero-section">
        <Container>
          <h1 className="hero-title">Find Your Perfect Journey</h1>
          <p className="hero-subtitle">Book hotels and flights at the best prices</p>
          <LinkContainer to="/hotels">
            <Button variant="primary" size="lg" className="me-3">Find Hotels</Button>
          </LinkContainer>
          <LinkContainer to="/flights">
            <Button variant="outline-light" size="lg">Find Flights</Button>
          </LinkContainer>
        </Container>
      </div>

      <Container className="my-5">
        <h2 className="text-center mb-5">Why Choose TravelBook?</h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="feature-card">
              <FaHotel className="feature-icon" />
              <h3>Best Hotels</h3>
              <p>Choose from thousands of hotels worldwide at unbeatable prices</p>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="feature-card">
              <FaPlane className="feature-icon" />
              <h3>Flight Deals</h3>
              <p>Find the best flight deals to any destination around the globe</p>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="feature-card">
              <FaMoneyBillWave className="feature-icon" />
              <h3>Best Price Guarantee</h3>
              <p>We guarantee the best prices or we'll refund the difference</p>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="feature-card">
              <FaShieldAlt className="feature-icon" />
              <h3>Secure Booking</h3>
              <p>Your personal and payment information is always secure with us</p>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="feature-card">
              <FaHeadset className="feature-icon" />
              <h3>24/7 Support</h3>
              <p>Our customer support team is available around the clock</p>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="feature-card">
              <FaGlobeAmericas className="feature-icon" />
              <h3>Global Coverage</h3>
              <p>Book hotels and flights to destinations all around the world</p>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="my-5 py-5 bg-light rounded">
        <Row className="align-items-center">
          <Col md={6}>
            <h2>Start Your Journey Today</h2>
            <p className="lead">Join thousands of satisfied travelers who have booked their dream vacations with TravelBook.</p>
            <p>Create an account to save your preferences, track your bookings, and get exclusive deals.</p>
            <LinkContainer to="/register">
              <Button variant="primary" size="lg" className="me-3">Sign Up Now</Button>
            </LinkContainer>
            <LinkContainer to="/login">
              <Button variant="outline-primary" size="lg">Login</Button>
            </LinkContainer>
          </Col>
          <Col md={6}>
            <img 
              src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
              alt="Travel" 
              className="img-fluid rounded"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
