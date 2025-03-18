import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">The Ultimate</span>
            <span className="block text-primary-600">Driving Instructor Platform</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Transform your driving school with AI-powered insights, seamless scheduling, 
            and comprehensive student progress tracking.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href="#waiting-list" className="btn-primary">
                Join Waiting List
              </a>
            </motion.div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center px-4 py-2 border border-primary-500 text-base font-medium rounded-md text-primary-600"
              >
                Coming Soon
              </motion.span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16"
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-gradient-to-b from-primary-50 to-white text-lg font-medium text-gray-900">
                Trusted by Driving Schools Across the UK
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection; 