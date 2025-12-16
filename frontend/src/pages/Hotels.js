import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Pagination } from 'react-bootstrap';
import { FaStar, FaWifi, FaSwimmingPool, FaParking, FaDumbbell, FaUtensils } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [destination, setDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  // Simulate fetching hotels data
  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const mockHotels = [
          {
            id: 1,
            name: 'Grand Plaza Hotel',
            location: 'New York, USA',
            price: 199,
            rating: 4.5,
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            amenities: ['wifi', 'pool', 'parking', 'gym', 'restaurant']
          },
          {
            id: 2,
            name: 'Seaside Resort & Spa',
            location: 'Miami, FL',
            price: 299,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            amenities: ['wifi', 'pool', 'spa', 'restaurant']
          },
          {
            id: 3,
            name: 'Mountain View Lodge',
            location: 'Denver, CO',
            price: 159,
            rating: 4.2,
            image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            amenities: ['wifi', 'parking', 'gym', 'restaurant']
          },
          {
            id: 4,
            name: 'Urban Boutique Hotel',
            location: 'San Francisco, CA',
            price: 249,
            rating: 4.6,
            image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            amenities: ['wifi', 'gym', 'restaurant']
          },
          {
            id: 5,
            name: 'Historic Downtown Inn',
            location: 'Boston, MA',
            price: 179,
            rating: 4.3,
            image: 'https://images.unsplash.com/photo-1590490360272-33a42abede8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            amenities: ['wifi', 'restaurant']
          },
          {
            id: 6,
            name: 'Luxury Beach Resort',
            location: 'Maui, HI',
            price: 459,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
            amenities: ['wifi', 'pool', 'spa', 'restaurant']
          }
        ];
        setHotels(mockHotels);
        setLoading(false);
      }, 1000);
    };

    fetchHotels();
  }, [currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would trigger an API call with the search parameters
    console.log({
      destination,
      checkInDate,
      checkOutDate,
      guests
    });
    // For now, just log the parameters and refresh the hotels
    window.location.reload();
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'wifi':
        return <FaWifi />;
      case 'pool':
        return <FaSwimmingPool />;
      case 'parking':
        return <FaParking />;
      case 'gym':
        return <FaDumbbell />;
      case 'restaurant':
        return <FaUtensils />;
      default:
        return null;
    }
  };

  const renderPagination = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return <Pagination>{items}</Pagination>;
  };

  return (
    <Container>
      <h1 className="my-4">Find Your Perfect Hotel</h1>

      <Card className="search-form mb-4">
        <Card.Body>
          <Form onSubmit={handleSearch}>
            <Row className="g-3">
              <Col md={3}>
                <Form.Group controlId="destination">
                  <Form.Label>Destination</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City or Hotel"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="checkIn">
                  <Form.Label>Check-in</Form.Label>
                  <DatePicker
                    selected={checkInDate}
                    onChange={(date) => setCheckInDate(date)}
                    className="form-control"
                    dateFormat="MMM d, yyyy"
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="checkOut">
                  <Form.Label>Check-out</Form.Label>
                  <DatePicker
                    selected={checkOutDate}
                    onChange={(date) => setCheckOutDate(date)}
                    className="form-control"
                    dateFormat="MMM d, yyyy"
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="guests">
                  <Form.Label>Guests</Form.Label>
                  <Form.Select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4+ Guests</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3} className="d-flex align-items-end">
                <Button variant="primary" type="submit" className="w-100">
                  Search Hotels
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <Row>
            {hotels.map((hotel) => (
              <Col md={4} className="mb-4" key={hotel.id}>
                <Card className="h-100">
                  <Card.Img variant="top" src={hotel.image} />
                  <Card.Body>
                    <Card.Title>{hotel.name}</Card.Title>
                    <Card.Text className="text-muted">{hotel.location}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={i < Math.floor(hotel.rating) ? 'text-warning' : 'text-secondary'}
                          />
                        ))}
                        <span className="ms-1">({hotel.rating})</span>
                      </div>
                      <div className="text-end">
                        <span className="fw-bold">${hotel.price}</span>
                        <span className="text-muted">/night</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      {hotel.amenities.map((amenity, index) => (
                        <span key={index} className="me-2">
                          {getAmenityIcon(amenity)}
                        </span>
                      ))}
                    </div>
                    <Button variant="primary" className="w-100">
                      Book Now
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="d-flex justify-content-center mt-4">
            {renderPagination()}
          </div>
        </>
      )}
    </Container>
  );
};

export default Hotels;
