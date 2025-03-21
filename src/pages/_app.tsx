// _app.tsx
import '../styles/globals.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import type { AppProps } from 'next/app';
import { LessonsProvider } from '../contexts/LessonsContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LessonsProvider>
      <Component {...pageProps} />
    </LessonsProvider>
  );
}