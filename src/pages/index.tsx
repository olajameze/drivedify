// In src/pages/index.tsx
import HeroSection from '../components/HeroSection';
import FeaturesGrid from '../components/FeaturesGrid';
import PricingTable from '../components/PricingTable';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import WaitingListSignup from '../components/WaitingListSignup';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import SEO from '../components/SEO';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturesGrid />
      <PricingTable />
      <Testimonials />
      <FAQ />
      <WaitingListSignup />
      <Footer />
    </>
  );
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const Home: React.FC = () => {
  return (
    <>
      <SEO 
        title="DrivEdify - The Ultimate Driving Instructor Web App (Coming Soon)"
        description="Join the waiting list for DrivEdify - a premium web app for driving instructors featuring AI-powered insights, lesson scheduling, student progress tracking, and more."
      />
      <main className="overflow-hidden">
        <motion.div
          initial="initial"
          animate="animate"
          className="space-y-20 md:space-y-32"
        >
          <HeroSection />
          <FeaturesGrid />
          <motion.div {...fadeInUp}>
            <PricingTable />
          </motion.div>
          <motion.div {...fadeInUp}>
            <Testimonials />
          </motion.div>
          <motion.div {...fadeInUp}>
            <FAQ />
          </motion.div>
          <motion.div {...fadeInUp}>
            <WaitingListSignup />
          </motion.div>
          <Footer />
        </motion.div>
      </main>
    </>
  );
};

export default Home;