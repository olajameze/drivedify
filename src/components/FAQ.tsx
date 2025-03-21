import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What is DrivEdify?',
    answer: 'DrivEdify is a comprehensive web application designed specifically for driving instructors. It includes features like lesson scheduling, student progress tracking, AI-powered insights, and more to help streamline your driving school business.'
  },
  {
    question: 'How does the free trial work?',
    answer: 'Our free trial gives you full access to all Premium features for 14 days. No credit card required.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards including Visa, Mastercard, and American Express.'
  }
];

const FAQ = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
        <div className="mt-8 space-y-4">
          {faqs.map((faq, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-3 bg-white rounded-lg shadow hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-left">{faq.question}</span>
                    <ChevronDownIcon className={`${open ? 'transform rotate-180' : ''} w-5 h-5`} />
                  </Disclosure.Button>
                  <Transition
                    show={open}
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="px-4 pt-4 pb-2 bg-gray-50 rounded-b">
                      <p className="text-gray-600">{faq.answer}</p>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;