import React from 'react';
import Signup from '../components/auth/Signup';
import Head from 'next/head';

export default function SignupPage() {
  return (
    <>
      <Head>
        <title>Create Account | DrivEdify</title>
        <meta name="description" content="Create a DrivEdify account to access premium driving instructor tools and resources." />
      </Head>
      <Signup />
    </>
  );
} 