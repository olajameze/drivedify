// _app.tsx
import '../styles/globals.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import type { AppProps } from 'next/app';
import SEO from '../components/SEO';
import { LessonsProvider } from '../contexts/LessonsContext';
import { TypeTest } from '../components/TypeTest';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LessonsProvider>
      <TypeTest />
      <SEO title="DrivEdify" description="Premium Driving Instruction" />
      <Component {...pageProps} />
    </LessonsProvider>
  );
}

export default MyApp;