import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';

export default function PrivacyPolicy() {
  return (
    <Layout>
      <Helmet>
        <title>Privacy Policy - DrivEdify</title>
        <meta name="description" content="DrivEdify's Privacy Policy" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto py-12 px-4"
      >
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        {/* Policy content */}
      </motion.div>
    </Layout>
  );
}
