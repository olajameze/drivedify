import type { NextApiRequest, NextApiResponse } from 'next';
import { cors } from '../../../utils/middleware';

interface SubscriptionResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// Initialize in-memory storage
let subscriptions: Set<string> = new Set();

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubscriptionResponse>
) {
  // Handle CORS
  await cors(req, res);

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    const { email } = req.body;
    console.log('Processing subscription:', email);

    if (!email || !email.includes('@')) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please enter a valid email address' 
      });
    }

    // Check for duplicate
    if (subscriptions.has(email)) {
      return res.status(400).json({
        success: false,
        error: 'Email already registered'
      });
    }

    // Store email
    subscriptions.add(email);
    console.log('Subscription successful:', email);

    return res.status(200).json({
      success: true,
      message: 'Successfully joined the waiting list!'
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to join. Please try again.'
    });
  }
}

export default handler;
