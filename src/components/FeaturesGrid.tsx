import React from 'react';

const FeaturesGrid: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold">Student Progress Tracking</h3>
            <p>Monitor your students' progress with detailed reports.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold">Lesson Scheduling</h3>
            <p>Seamlessly schedule lessons with our intuitive calendar.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold">AI-Powered Insights</h3>
            <p>Get actionable insights to improve your teaching methods.</p>
          </div>
          {/* Add more features as needed */}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid; 