import Head from 'next/head';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturesGrid from '../components/FeaturesGrid';
import PricingTable from '../components/PricingTable';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import WaitingListSignup from '../components/WaitingListSignup';
import Footer from '../components/Footer';
import ApiKeyTest from '../components/ApiKeyTest';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>DrivEdify - The Ultimate Driving Instructor Platform</title>
        <meta name="description" content="DrivEdify is a comprehensive web application designed for driving instructors, featuring lesson scheduling, student progress tracking, and AI-powered insights." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="DrivEdify - The Ultimate Driving Instructor Platform" />
        <meta property="og:description" content="Transform your driving school with our comprehensive instructor platform. Join the waiting list for early access!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://drivedify.com" />
        <meta property="og:image" content="https://drivedify.com/og-image.jpg" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DrivEdify - The Ultimate Driving Instructor Platform" />
        <meta name="twitter:description" content="Transform your driving school with our comprehensive instructor platform. Join the waiting list for early access!" />
        <meta name="twitter:image" content="https://drivedify.com/twitter-image.jpg" />
      </Head>

      <Navbar />

      <main className="pt-16">
        <Hero />
        <FeaturesGrid />
        <PricingTable />
        <Testimonials />
        <FAQ />
        <WaitingListSignup />
      </main>

      <Footer />

      {/* Add the test component */}
      {process.env.NODE_ENV === 'development' && <ApiKeyTest />}
    </div>
  );
}