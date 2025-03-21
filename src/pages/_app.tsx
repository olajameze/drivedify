import '../styles/globals.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import type { AppProps } from 'next/app';
import { LessonsProvider } from '../contexts/LessonsContext';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Create a version of LessonsProvider that only runs on client-side
const ClientOnlyLessonsProvider = dynamic(
  () => Promise.resolve(({ children }: { children: React.ReactNode }) => (
    <LessonsProvider>{children}</LessonsProvider>
  )),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ClientOnlyLessonsProvider>
      <Component {...pageProps} />
    </ClientOnlyLessonsProvider>
  );
} 