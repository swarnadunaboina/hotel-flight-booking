import React, { useState } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SocialLoginNew from '../components/SocialLoginNew';

const Login = () => {
  const { login, googleSignIn, facebookSignIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (error) {
      setError('Login failed, please check your credentials');
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      const result = await googleSignIn();
      console.log("Google sign-in successful:", result.user);
      navigate('/');
    } catch (error) {
      setError('Failed to sign in with Google: ' + error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      const result = await facebookSignIn();
      console.log("Facebook sign-in successful:", result.user);
      navigate('/');
    } catch (error) {
      setError('Failed to sign in with Facebook: ' + error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
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
              <Button disabled={loading} className="w-100 mt-3" type="submit">
                Login
              </Button>
            </Form>
            
            <SocialLoginNew 
              onGoogleSignIn={handleGoogleSignIn}
              onFacebookSignIn={handleFacebookSignIn}
              loading={loading}
              isLogin={true}
            />
            
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </Container>
  );
};

export default Login;
