import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';

export default function Terms() {
  return (
    <Layout>
      <Helmet>
        <title>Terms of Service - DrivEdify</title>
        <meta name="description" content="DrivEdify's Terms of Service" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto py-12 px-4"
      >
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        {/* Terms content */}
      </motion.div>
    </Layout>
  );
}
