import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Pagination, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaPlane, FaClock, FaSuitcase } from 'react-icons/fa';

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [tripType, setTripType] = useState('roundtrip');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [passengers, setPassengers] = useState(1);
  const [classType, setClassType] = useState('economy');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  // Simulate fetching flights data
  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const mockFlights = [
          {
            id: 1,
            airline: 'SkyWings Airlines',
            flightNumber: 'SW123',
            from: 'New York (JFK)',
            to: 'Los Angeles (LAX)',
            departureTime: '08:00 AM',
            arrivalTime: '11:30 AM',
            duration: '5h 30m',
            price: 299,
            stops: 0,
            baggage: '1 carry-on, 1 checked'
          },
          {
            id: 2,
            airline: 'AeroJet',
            flightNumber: 'AJ456',
            from: 'New York (JFK)',
            to: 'Los Angeles (LAX)',
            departureTime: '10:15 AM',
            arrivalTime: '02:45 PM',
            duration: '6h 30m',
            price: 249,
            stops: 1,
            baggage: '1 carry-on, 1 checked'
          },
          {
            id: 3,
            airline: 'Global Airways',
            flightNumber: 'GA789',
            from: 'New York (JFK)',
            to: 'Los Angeles (LAX)',
            departureTime: '02:00 PM',
            arrivalTime: '05:30 PM',
            duration: '5h 30m',
            price: 359,
            stops: 0,
            baggage: '1 carry-on, 1 checked'
          },
          {
            id: 4,
            airline: 'TransContinental',
            flightNumber: 'TC101',
            from: 'New York (JFK)',
            to: 'Los Angeles (LAX)',
            departureTime: '06:45 PM',
            arrivalTime: '10:15 PM',
            duration: '5h 30m',
            price: 279,
            stops: 0,
            baggage: '1 carry-on, 1 checked'
          },
          {
            id: 5,
            airline: 'SkyWings Airlines',
            flightNumber: 'SW246',
            from: 'New York (JFK)',
            to: 'Los Angeles (LAX)',
            departureTime: '11:30 PM',
            arrivalTime: '03:00 AM+1',
            duration: '5h 30m',
            price: 229,
            stops: 0,
            baggage: '1 carry-on, 1 checked'
          },
          {
            id: 6,
            airline: 'Horizon Airlines',
            flightNumber: 'HA357',
            from: 'New York (JFK)',
            to: 'Los Angeles (LAX)',
            departureTime: '07:30 AM',
            arrivalTime: '12:45 PM',
            duration: '7h 15m',
            price: 199,
            stops: 2,
            baggage: '1 carry-on'
          }
        ];
        setFlights(mockFlights);
        setLoading(false);
      }, 1000);
    };

    fetchFlights();
  }, [currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would trigger an API call with the search parameters
    console.log({
      tripType,
      from,
      to,
      departureDate,
      returnDate,
      passengers,
      classType
    });
    // For now, just log the parameters and refresh the flights
    window.location.reload();
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
      <h1 className="my-4">Find Your Perfect Flight</h1>

      <Card className="search-form mb-4">
        <Card.Body>
          <Form onSubmit={handleSearch}>
            <Row className="g-3 mb-3">
              <Col md={3}>
                <Form.Group controlId="tripType">
                  <Form.Label>Trip Type</Form.Label>
                  <Form.Select
                    value={tripType}
                    onChange={(e) => setTripType(e.target.value)}
                  >
                    <option value="roundtrip">Round Trip</option>
                    <option value="oneway">One Way</option>
                    <option value="multicity">Multi-City</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="from">
                  <Form.Label>From</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City or Airport"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="to">
                  <Form.Label>To</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City or Airport"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="classType">
                  <Form.Label>Class</Form.Label>
                  <Form.Select
                    value={classType}
                    onChange={(e) => setClassType(e.target.value)}
                  >
                    <option value="economy">Economy</option>
                    <option value="premium">Premium Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First Class</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-3">
              <Col md={3}>
                <Form.Group controlId="departureDate">
                  <Form.Label>Departure</Form.Label>
                  <DatePicker
                    selected={departureDate}
                    onChange={(date) => setDepartureDate(date)}
                    className="form-control"
                    dateFormat="MMM d, yyyy"
                  />
                </Form.Group>
              </Col>
              {tripType === 'roundtrip' && (
                <Col md={3}>
                  <Form.Group controlId="returnDate">
                    <Form.Label>Return</Form.Label>
                    <DatePicker
                      selected={returnDate}
                      onChange={(date) => setReturnDate(date)}
                      className="form-control"
                      dateFormat="MMM d, yyyy"
                    />
                  </Form.Group>
                </Col>
              )}
              <Col md={tripType === 'roundtrip' ? 3 : 6}>
                <Form.Group controlId="passengers">
                  <Form.Label>Passengers</Form.Label>
                  <Form.Select
                    value={passengers}
                    onChange={(e) => setPassengers(parseInt(e.target.value))}
                  >
                    <option value="1">1 Passenger</option>
                    <option value="2">2 Passengers</option>
                    <option value="3">3 Passengers</option>
                    <option value="4">4+ Passengers</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3} className="d-flex align-items-end">
                <Button variant="primary" type="submit" className="w-100">
                  Search Flights
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
          {flights.length > 0 ? (
            <>
              <Card className="mb-4">
                <Card.Body>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>Airline</th>
                        <th>Flight</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Departure</th>
                        <th>Arrival</th>
                        <th>Duration</th>
                        <th>Stops</th>
                        <th>Baggage</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {flights.map((flight) => (
                        <tr key={flight.id}>
                          <td>{flight.airline}</td>
                          <td>{flight.flightNumber}</td>
                          <td>{flight.from}</td>
                          <td>{flight.to}</td>
                          <td>{flight.departureTime}</td>
                          <td>{flight.arrivalTime}</td>
                          <td>
                            <FaClock className="me-1" />
                            {flight.duration}
                          </td>
                          <td>{flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}</td>
                          <td>
                            <FaSuitcase className="me-1" />
                            {flight.baggage}
                          </td>
                          <td className="fw-bold">${flight.price}</td>
                          <td>
                            <Button variant="primary" size="sm">
                              Book
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>

              <div className="d-flex justify-content-center mt-4">
                {renderPagination()}
              </div>
            </>
          ) : (
            <Card>
              <Card.Body className="text-center py-5">
                <FaPlane size={50} className="text-muted mb-3" />
                <h4>No flights found</h4>
                <p className="text-muted">Try adjusting your search criteria</p>
              </Card.Body>
            </Card>
          )}
        </>
      )}
    </Container>
  );
};

export default Flights;
