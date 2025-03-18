// pages/api/test-api-key.js

export default function handler(req, res) {
    res.status(200).json({ message: 'API key is valid' });
    const { method } = req;
    
    if (method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    try {
      fetch('https://connect.mailerlite.com/api', {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MAILERLITE_API_KEY}`
        }
      })
        .then(response => response.json())
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).json({ message: error.message }));
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}
