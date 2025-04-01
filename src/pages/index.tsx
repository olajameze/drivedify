// In src/pages/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import HeroSection from '../components/HeroSection';
import FeaturesGrid from '../components/FeaturesGrid';
import PricingTable from '../components/PricingTable';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import WaitingListSignup from '../components/WaitingListSignup';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const Home = () => {
  const router = useRouter();
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <>
      <SEO 
        title="DrivEdify - The Ultimate Driving Instructor Web App"
        description="Join DrivEdify - a premium web app for driving instructors featuring AI-powered insights, lesson scheduling, student progress tracking, and more."
      />
      <main>
        <HeroSection />
        <FeaturesGrid />
        <PricingTable />
        <Testimonials />
        <FAQ />
        <WaitingListSignup />
        <Footer />
      </main>
    </>
  );
};

export default Home;