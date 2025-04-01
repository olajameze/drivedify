// _app.tsx
import '../styles/globals.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import type { AppProps } from 'next/app';
import { LessonsProvider } from '../contexts/LessonsContext';

function MyApp({ Component, pageProps }: AppProps) {
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