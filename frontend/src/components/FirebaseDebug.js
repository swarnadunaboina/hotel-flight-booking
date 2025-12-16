import React, { useState } from 'react';
import { Button, Card, Container, Alert } from 'react-bootstrap';
import { testFirebaseAuth } from '../testFirebase';

const FirebaseDebug = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setLoading(true);
    const testResult = await testFirebaseAuth();
    setResult(testResult);
    setLoading(false);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
      <div className="w-100" style={{ maxWidth: '600px' }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Firebase Debug</h2>
            <p className="text-center mb-4">
              Use this tool to test your Firebase configuration and troubleshoot authentication issues.
            </p>

            <div className="text-center mb-4">
              <Button 
                variant="primary" 
                onClick={handleTest} 
                disabled={loading}
              >
                {loading ? 'Testing...' : 'Test Firebase Configuration'}
              </Button>
            </div>

            {result && (
              <Alert variant={result.success ? 'success' : 'danger'}>
                <Alert.Heading>
                  {result.success ? 'Success' : 'Error'}
                </Alert.Heading>
                <p>{result.message}</p>
              </Alert>
            )}

            <div className="mt-4">
              <h5>Troubleshooting Tips:</h5>
              <ul>
                <li>Make sure your Firebase project is set up correctly</li>
                <li>Check that Authentication is enabled in your Firebase project</li>
                <li>Verify that your API key is valid</li>
                <li>Ensure your domain is authorized in Firebase</li>
                <li>Check browser console for additional error messages</li>
              </ul>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default FirebaseDebug;
