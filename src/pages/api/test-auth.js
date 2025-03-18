export default function handler(req, res) {
  // Remove this in production - only for testing!
  const apiKey = process.env.NEXT_PUBLIC_MAILERLITE_API_KEY;
  res.status(200).json({ 
    keyExists: !!apiKey,
    keyLength: apiKey ? apiKey.length : 0
  });
} 