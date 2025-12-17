import React, { useState } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import SocialLoginNew from '../components/SocialLoginNew';

const Login = () => {
  const { login, googleSignIn, facebookSignIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // No need to handle redirect result since we're using popup authentication

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('No account found with this email. Please register first.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again or reset your password.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (error.code === 'auth/user-disabled') {
        setError('This account has been disabled. Please contact support.');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Too many failed login attempts. Please try again later.');
      } else if (error.code === 'auth/invalid-login-credentials') {
        setError('Invalid login credentials. This email might be registered with a social login method. Try signing in with Google or Facebook, or reset your password.');
      } else {
        setError('Login failed: ' + error.message);
      }
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      const result = await googleSignIn();
      // With popup authentication, we get the result immediately
      if (result && result.user) {
        console.log("Google sign-in successful:", result.user);
        navigate('/');
      }
      setLoading(false);
    } catch (error) {
      setError('Failed to sign in with Google: ' + error.message);
      console.error(error);
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      setError('');
      setLoading(true);
      const result = await facebookSignIn();
      // With popup authentication, we get the result immediately
      if (result && result.user) {
        console.log("Facebook sign-in successful:", result.user);
        navigate('/');
      }
      setLoading(false);
    } catch (error) {
      setError('Failed to sign in with Facebook: ' + error.message);
      console.error(error);
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    try {
      setError('');
      setMessage('');
      setLoading(true);
      await auth.sendPasswordResetEmail(email);
      setMessage('Password reset email sent! Check your inbox.');
      setLoading(false);
    } catch (error) {
      setError('Failed to send password reset email: ' + error.message);
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
            {message && <Alert variant="success">{message}</Alert>}
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

            <div className="w-100 text-center mt-3 mb-3">
              <p className="text-muted">Or login with:</p>
            </div>
            <SocialLoginNew
              onGoogleSignIn={handleGoogleSignIn}
              onFacebookSignIn={handleFacebookSignIn}
              loading={loading}
              isLogin={true}
            />

            <div className="w-100 text-center mt-3">
              <Button variant="link" onClick={handlePasswordReset} disabled={loading}>
                Forgot Password?
              </Button>
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