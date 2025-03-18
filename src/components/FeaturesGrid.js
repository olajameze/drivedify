import { motion } from 'framer-motion';
import {
  CalendarIcon,
  ChartBarIcon,
  LightBulbIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Lesson Scheduling',
    description: 'Effortlessly manage your lesson schedule with our intuitive calendar system.',
    icon: CalendarIcon,
  },
  {
    name: 'Student Progress Tracking',
    description: 'Monitor and record student progress with detailed performance metrics.',
    icon: ChartBarIcon,
  },
  {
    name: 'AI-Powered Insights',
    description: 'Get intelligent recommendations to optimize your teaching methods.',
    icon: LightBulbIcon,
  },
  {
    name: 'Mock Driving Tests',
    description: 'Prepare students with realistic mock tests and detailed feedback.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Hazard Perception Training',
    description: 'Interactive hazard perception training modules for better preparation.',
    icon: ExclamationTriangleIcon,
  },
  {
    name: 'In-App Payments',
    description: 'Secure and convenient payment processing for your lessons.',
    icon: CreditCardIcon,
  },
];

const FeaturesGrid = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Everything You Need
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Powerful features to help you manage and grow your driving school
          </p>
        </motion.div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="h-full bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-primary-50 rounded-md">
                      <feature.icon className="h-6 w-6 text-primary-600" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                    <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid; 