import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesGrid from '../components/FeaturesGrid';
import PricingTable from '../components/PricingTable';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesGrid />
      <PricingTable />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home; 