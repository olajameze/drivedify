export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Please enter a valid email address' });
  }

  try {
    const requestBody = {
      email: email,
      groups: ['waiting-list'] // Ensure this group exists in your MailerLite account
    };
    console.log('Request body:', JSON.stringify(requestBody));
    
    const response = await fetch('https://api.mailerlite.com/api/v2/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-MailerLite-ApiKey': process.env.NEXT_PUBLIC_MAILERLITE_API_KEY
      },
      body: JSON.stringify(requestBody) // Use requestBody here
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to subscribe');
    }

    return res.status(200).json({ message: 'Successfully subscribed to the waiting list' });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Something went wrong. Please try again.' });
  }
}
