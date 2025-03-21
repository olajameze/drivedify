// _app.tsx
import '../styles/globals.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { LessonsProvider } from '../contexts/LessonsContext';

const ClientOnlyLessonsProvider = dynamic(
  () => Promise.resolve(({ children }: { children: React.ReactNode }) => (
    <LessonsProvider>{children}</LessonsProvider>
  )),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClientOnlyLessonsProvider>
      <Component {...pageProps} />
    </ClientOnlyLessonsProvider>
  );
}