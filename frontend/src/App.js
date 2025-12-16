import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import Flights from './pages/Flights';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import BookingHistory from './pages/BookingHistory';
import ForgotPassword from './pages/ForgotPassword';
import FirebaseDebug from './components/FirebaseDebug';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<Home />} exact />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/flights" element={<Flights />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/booking-history" element={<BookingHistory />} />
              <Route path="/debug" element={<FirebaseDebug />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
