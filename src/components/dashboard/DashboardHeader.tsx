import React from 'react';

interface DashboardHeaderProps {}

const DashboardHeader: React.FC<DashboardHeaderProps> = () => {
  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, John</h1>
        <div className="text-right">
          <p className="text-sm text-gray-500">Today's Date</p>
          <p className="text-lg font-semibold">{new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader; 