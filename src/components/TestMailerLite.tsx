import { useState } from 'react';

const TestMailerLite = () => {
  const [testEmail, setTestEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleTest = async () => {
    setStatus('Testing connection...');
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: testEmail }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to test connection');
      }
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to test connection');
      }
  
      setStatus('Success! Check MailerLite dashboard.');
    } catch (err) {
      console.error('Connection test error:', (err as Error).message);
      setStatus(`Error: ${(err as Error).message}`);
    }
  };
  

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white rounded-lg shadow-lg z-50">
      <input
        type="email"
        value={testEmail}
        onChange={(e) => setTestEmail(e.target.value)}
        placeholder="Test email"
        className="mb-2 p-2 border rounded"
      />
      <button
        onClick={handleTest}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Test API
      </button>
      <p className="mt-2 text-sm">{status}</p>
    </div>
  );
};

export default TestMailerLite;
