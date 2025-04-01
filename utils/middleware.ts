import type { NextApiRequest, NextApiResponse } from 'next';

export async function cors(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const allowedOrigins = [
    'https://drivedify-git-master-olajamezes-projects.vercel.app',
    'http://localhost:3000'
  ];
  
  const origin = req.headers.origin;
  
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
}