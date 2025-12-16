import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

const SocialLogin = ({ onGoogleSignIn, onFacebookSignIn, loading, isLogin = true }) => {
  return (
    <>
      <div className="w-100 text-center mt-3 mb-3">
        <p>OR</p>
      </div>

      <Row className="g-2">
        <Col>
          <Button 
            variant="outline-danger" 
            className="w-100 d-flex justify-content-center align-items-center"
            disabled={loading}
            onClick={onGoogleSignIn}
          >
            <FaGoogle className="me-2" /> Google
          </Button>
        </Col>
        <Col>
          <Button 
            variant="outline-primary" 
            className="w-100 d-flex justify-content-center align-items-center"
            disabled={loading}
            onClick={onFacebookSignIn}
          >
            <FaFacebook className="me-2" /> Facebook
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default SocialLogin;
