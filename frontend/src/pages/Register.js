import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SocialLoginNew from '../components/SocialLoginNew';

const Register = () => {
  const { register, googleSignIn, facebookSignIn, redirectResult } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Handle redirect result
  useEffect(() => {
    if (redirectResult && redirectResult.user) {
      console.log("Authentication successful after redirect:", redirectResult.user);
      navigate('/');
    }
  }, [redirectResult, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await register(name, email, password);
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please use a different email or try logging in.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError('Registration failed: ' + error.message);
      }
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      const result = await googleSignIn();
      // For redirect-based auth, we won't get a result immediately
      // The navigation will happen after the redirect
      if (result && result.user) {
        console.log("Google sign-up successful:", result.user);
        navigate('/');
      } else {
        // Show a message that the user will be redirected
        setError('You will be redirected to Google for authentication...');
      }
    } catch (error) {
      setError('Failed to sign up with Google: ' + error.message);
      console.error(error);
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      const result = await facebookSignIn();
      // For redirect-based auth, we won't get a result immediately
      // The navigation will happen after the redirect
      if (result && result.user) {
        console.log("Facebook sign-up successful:", result.user);
        navigate('/');
      } else {
        // Show a message that the user will be redirected
        setError('You will be redirected to Facebook for authentication...');
      }
    } catch (error) {
      setError('Failed to sign up with Facebook: ' + error.message);
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Register</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group id="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group id="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group id="password-confirm" className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-3" type="submit">
                Register
              </Button>
            </Form>
            
            <SocialLoginNew 
              onGoogleSignIn={handleGoogleSignIn}
              onFacebookSignIn={handleFacebookSignIn}
              loading={loading}
              isLogin={false}
            />
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </Container>
  );
};

export default Register;
