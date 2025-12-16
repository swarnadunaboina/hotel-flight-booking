import React, { useState } from 'react';
import { Card, Container, Row, Col, Button, Badge, Tabs, Tab } from 'react-bootstrap';

const BookingHistory = () => {
  const [key, setKey] = useState('hotels');

  // Mock hotel booking data
  const hotelBookings = [
    {
      id: 'HTL001',
      hotelName: 'Hilton Hotel',
      location: 'Beijing',
      checkIn: '2023-06-15',
      checkOut: '2023-06-18',
      roomType: 'Deluxe King Room',
      guests: 2,
      price: 1200,
      status: 'completed'
    },
    {
      id: 'HTL002',
      hotelName: 'Marriott Hotel',
      location: 'Shanghai',
      checkIn: '2023-08-10',
      checkOut: '2023-08-12',
      roomType: 'Executive Suite',
      guests: 2,
      price: 1800,
      status: 'upcoming'
    }
  ];

  // Mock flight booking data
  const flightBookings = [
    {
      id: 'FLT001',
      airline: 'Air China',
      flightNumber: 'CA1234',
      departure: 'Beijing',
      arrival: 'Shanghai',
      departureDate: '2023-07-20',
      returnDate: '2023-07-25',
      passengers: 1,
      price: 2500,
      status: 'completed'
    },
    {
      id: 'FLT002',
      airline: 'China Eastern Airlines',
      flightNumber: 'MU5678',
      departure: 'Guangzhou',
      arrival: 'Chengdu',
      departureDate: '2023-09-15',
      returnDate: '2023-09-20',
      passengers: 2,
      price: 3200,
      status: 'upcoming'
    }
  ];

  const getStatusBadge = (status) => {
    return status === 'completed'
      ? <Badge bg="success">Completed</Badge>
      : <Badge bg="primary">Upcoming</Badge>;
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">My Bookings</h2>

      <Tabs
        id="booking-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-4"
      >
        <Tab eventKey="hotels" title="Hotel Bookings">
          {hotelBookings.length > 0 ? (
            <Row>
              {hotelBookings.map(booking => (
                <Col md={6} className="mb-4" key={booking.id}>
                  <Card className="h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <Card.Title>{booking.hotelName}</Card.Title>
                        {getStatusBadge(booking.status)}
                      </div>
                      <Card.Subtitle className="mb-2 text-muted">{booking.location}</Card.Subtitle>
                      <div className="mb-3">
                        <p><strong>Check-in Date:</strong> {booking.checkIn}</p>
                        <p><strong>Check-out Date:</strong> {booking.checkOut}</p>
                        <p><strong>Room Type:</strong> {booking.roomType}</p>
                        <p><strong>Guests:</strong> {booking.guests}</p>
                        <p><strong>Total Price:</strong> ¥{booking.price}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <Button variant="outline-primary" size="sm">View Details</Button>
                        {booking.status === 'upcoming' && (
                          <Button variant="outline-danger" size="sm">Cancel Booking</Button>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p>You don't have any hotel bookings yet.</p>
          )}
        </Tab>

        <Tab eventKey="flights" title="Flight Bookings">
          {flightBookings.length > 0 ? (
            <Row>
              {flightBookings.map(booking => (
                <Col md={6} className="mb-4" key={booking.id}>
                  <Card className="h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <Card.Title>{booking.airline} {booking.flightNumber}</Card.Title>
                        {getStatusBadge(booking.status)}
                      </div>
                      <Card.Subtitle className="mb-2 text-muted">
                        {booking.departure} → {booking.arrival}
                      </Card.Subtitle>
                      <div className="mb-3">
                        <p><strong>Departure Date:</strong> {booking.departureDate}</p>
                        <p><strong>Return Date:</strong> {booking.returnDate}</p>
                        <p><strong>Passengers:</strong> {booking.passengers}</p>
                        <p><strong>Total Price:</strong> ¥{booking.price}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <Button variant="outline-primary" size="sm">View Details</Button>
                        {booking.status === 'upcoming' && (
                          <Button variant="outline-danger" size="sm">Cancel Booking</Button>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p>You don't have any flight bookings yet.</p>
          )}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default BookingHistory;
