import { useState } from 'react';
import { motion } from 'framer-motion';

export default function WaitingListSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    try {
      setStatus('loading');
      
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        credentials: 'same-origin'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join');
      }

      setStatus('success');
      setMessage(data.message || 'Thanks for joining!');
      setEmail('');

    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to join');
    }
  };

  return (
    <motion.div 
      className="max-w-md mx-auto p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          disabled={status === 'loading'}
          required
        />
        
        <button
          type="submit"
          className={`w-full p-3 text-white bg-blue-600 rounded-md transition-colors
            ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Joining...' : 'Join Waiting List'}
        </button>

        {message && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}
          >
            {message}
          </motion.p>
        )}
      </form>
    </motion.div>
  );
}