import React from 'react';

const PricingTable: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center">Pricing Plans</h2>
        <p className="mt-4 text-lg text-center">Our pricing plans are designed to fit your needs.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold">Basic Plan</h3>
            <p className="mt-2">$19/month</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold">Pro Plan</h3>
            <p className="mt-2">$39/month</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold">Premium Plan</h3>
            <p className="mt-2">$59/month</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
