// src/pages/api/subscribe.js
import { NextResponse } from 'next/server';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Using the correct MailerLite API endpoint
    const response = await fetch('https://api.mailerlite.com/api/v2/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MAILERLITE_API_KEY}`,
          'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        groups: ['148122054491637022'], // Your group ID
        resubscribe: true
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('MailerLite API error:', data);
      return res.status(response.status).json({ 
        error: data.error?.message || 'Failed to subscribe' 
      });
    }

    return res.status(200).json({ 
      success: true,
      message: 'Successfully subscribed to the waiting list!'
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ 
      error: 'Failed to subscribe. Please try again later.' 
    });
  }
}

// Configure CORS
export const config = {
  api: {
    bodyParser: true,
    externalResolver: true,
  },
}

  