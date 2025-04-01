import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';

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

export default function FAQ() {
  return (
    <section className="w-full px-4 pt-16">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <div className="faq-item">
                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                    <span>{faq.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-blue-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    {faq.answer}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </section>
  );
}
