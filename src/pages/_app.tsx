// _app.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import type { AppProps } from 'next/app';
import { LessonsProvider } from '../contexts/LessonsContext';

const publicPaths = ['/', '/login'];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const isPublicPath = publicPaths.includes(router.pathname);

    if (!isLoggedIn && !isPublicPath) {
      router.push('/login');
    }
  }, [router, router.pathname]);

  return (
    <div className="app-root">
      <LessonsProvider>
        <div className="app-content">
          <Component {...pageProps} />
        </div>
      </LessonsProvider>
    </div>
  );
}

export default MyApp;