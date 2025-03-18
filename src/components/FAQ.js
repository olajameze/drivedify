import { motion } from 'framer-motion';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: "What is DrivEdify?",
    answer: "DrivEdify is a comprehensive web application designed specifically for driving instructors. It includes features like lesson scheduling, student progress tracking, AI-powered insights, and more to help streamline your driving school business."
  },
  {
    question: "When will DrivEdify be available?",
    answer: "DrivEdify is currently in development and will be launching soon. Join our waiting list to be among the first to know when we launch and receive exclusive early access benefits."
  },
  {
    question: "How much does it cost?",
    answer: "We offer a free plan with basic features and a Premium plan at £10/month. The Premium plan includes all features including AI-powered insights, advanced analytics, and priority support."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we take data security seriously. All data is encrypted both in transit and at rest, and we comply with GDPR and other relevant data protection regulations."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees."
  },
  {
    question: "What kind of support do you offer?",
    answer: "We offer email support for all users. Premium plan subscribers get priority support with faster response times and dedicated assistance."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Everything you need to know about DrivEdify
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 max-w-3xl mx-auto divide-y divide-gray-200"
        >
          {faqs.map((faq, index) => (
            <Disclosure as="div" key={faq.question} className="pt-6">
              {({ open }) => (
                <>
                  <dt className="text-lg">
                    <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                      <span className="font-medium text-gray-900">
                        {faq.question}
                      </span>
                      <span className="ml-6 h-7 flex items-center">
                        <ChevronDownIcon
                          className={`${
                            open ? '-rotate-180' : 'rotate-0'
                          } h-6 w-6 transform transition-transform duration-200`}
                          aria-hidden="true"
                        />
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base text-gray-500">{faq.answer}</p>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ; 