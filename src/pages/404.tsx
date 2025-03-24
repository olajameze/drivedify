import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function NotFound() {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-24"
      >
        <h1 className="text-9xl font-bold text-blue-400 mb-8">404</h1>
        <p className="text-2xl mb-8">Page not found</p>
        <Link href="/" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
          Return Home
        </Link>
      </motion.div>
    </Layout>
  );
}
