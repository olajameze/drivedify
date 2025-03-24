import React from 'react';

const EarningsOverview: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 sm:px-6 bg-yellow-50 border-b border-yellow-100">
        <h3 className="text-lg leading-6 font-medium text-yellow-900">Earnings Overview</h3>
        <p className="mt-1 text-sm text-yellow-600">Track your earnings and completed lessons.</p>
      </div>
      <div className="p-4">
        {/* Placeholder for earnings data */}
        <p>No earnings data available.</p>
      </div>
    </div>
  );
};

export default EarningsOverview;
