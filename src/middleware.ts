import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { NextApiRequest, NextApiResponse } from 'next';

export function middleware(request: NextRequest) {
  // Get the requested pathname
  const { pathname } = request.nextUrl

  // Explicit check for root path
  if (pathname === '/') {
    const landingPageUrl = 'https://drivedify-git-master-olajamezes-projects.vercel.app'
    console.log(`Redirecting from ${pathname} to ${landingPageUrl}`)
    return NextResponse.redirect(landingPageUrl)
  }

  // Allow other routes to pass through
  console.log(`Allowing through path: ${pathname}`)
  return NextResponse.next()
}

export const config = {
  // Only match the root path for redirection
  matcher: '/'
}

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