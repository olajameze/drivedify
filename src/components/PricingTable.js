import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/outline';

const tiers = [
  {
    name: 'Free Plan',
    href: '#waiting-list',
    priceMonthly: '£0',
    description: 'Perfect for getting started',
    features: [
      'Basic lesson scheduling',
      'Student management',
      'Digital lesson records',
      'Basic progress tracking',
      'Email support'
    ],
    cta: 'Start Free'
  },
  {
    name: 'Premium',
    href: '#waiting-list',
    priceMonthly: '£10',
    description: 'Everything you need to grow',
    features: [
      'Advanced scheduling system',
      'AI-powered insights',
      'Mock test simulations',
      'Hazard perception training',
      'Student progress analytics',
      'In-app payments',
      'Priority support',
      'Custom branding'
    ],
    cta: 'Get Premium',
    featured: true
  }
];

const PricingTable = () => {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Choose the plan that's right for you
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-20 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8"
        >
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 bg-white border rounded-2xl shadow-sm flex flex-col ${
                tier.featured ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              {tier.featured && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4">
                  <span className="inline-flex rounded-full bg-primary-500 px-4 py-1 text-sm font-semibold text-white">
                    Popular
                  </span>
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{tier.name}</h3>
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">
                    {tier.priceMonthly}
                  </span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </p>
                <p className="mt-6 text-gray-500">{tier.description}</p>

                <ul role="list" className="mt-6 space-y-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex">
                      <CheckIcon
                        className="flex-shrink-0 w-6 h-6 text-primary-500"
                        aria-hidden="true"
                      />
                      <span className="ml-3 text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={tier.href}
                className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                  tier.featured
                    ? 'bg-primary-500 text-white hover:bg-primary-600'
                    : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                }`}
              >
                {tier.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingTable; 