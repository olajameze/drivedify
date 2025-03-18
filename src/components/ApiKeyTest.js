import { useState, useEffect } from 'react';
const ApiKeyTest = () => {
  const [status, setStatus] = useState('Testing...');

  useEffect(() => {
    const testApiKey = async () => {
      try {
        const response = await fetch('/api/test-api-key');
        const data = await response.json();
        
        if (response.ok) {
          setStatus('API Key is valid!');
        } else {
          setStatus(`API Key error: ${data.message}`);
        }
      } catch (err) {
        setStatus(`Error: ${err.message}`);
      }
    };

    testApiKey();
  }, []);

  return (
    <div className="fixed top-4 right-4 p-4 bg-white rounded-lg shadow-lg z-50">
      <p className={status.includes('valid') ? 'text-green-500' : 'text-red-500'}>
        {status}
      </p>
    </div>
  );
};

export default ApiKeyTest; 