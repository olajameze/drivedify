import React from 'react';
import { CurrencyDollarIcon } from '@heroicons/react/outline';

const EarningsOverview: React.FC = () => {
  // Mock data - would come from API in real app
  const earnings = {
    current: 1425.50,
    previous: 1250.00,
    projection: 1600.00,
    breakdown: [
      { day: 'Mon', amount: 245.00 },
      { day: 'Tue', amount: 320.50 },
      { day: 'Wed', amount: 210.00 },
      { day: 'Thu', amount: 350.00 },
      { day: 'Fri', amount: 300.00 },
      { day: 'Sat', amount: 0 },
      { day: 'Sun', amount: 0 }
    ]
  };

  // Calculate percentage increase from previous month
  const percentageIncrease = ((earnings.current - earnings.previous) / earnings.previous) * 100;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 sm:px-6 bg-blue-50 border-b border-blue-100">
        <h3 className="text-lg leading-6 font-medium text-blue-900 flex items-center">
          <CurrencyDollarIcon className="h-5 w-5 mr-2 text-blue-500" />
          Earnings Overview
        </h3>
        <p className="mt-1 text-sm text-blue-600">Current month earnings and projections</p>
      </div>
      
      <div className="p-4 sm:px-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-gray-500">Current month</p>
            <p className="text-2xl font-bold text-gray-900">£{earnings.current.toFixed(2)}</p>
            <p className="text-sm text-green-600">
              {percentageIncrease.toFixed(1)}% increase from last month
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Projected</p>
            <p className="text-2xl font-bold text-gray-900">£{earnings.projection.toFixed(2)}</p>
            <p className="text-sm text-gray-600">End of month estimate</p>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">This Week's Breakdown</p>
          <div className="flex justify-between h-32">
            {earnings.breakdown.map((day) => (
              <div key={day.day} className="flex flex-col items-center justify-end flex-1">
                <div 
                  className="w-full bg-blue-500 rounded-t"
                  style={{ 
                    height: `${day.amount ? (day.amount / 400) * 100 : 0}%`,
                    minHeight: day.amount ? '4px' : '0',
                    opacity: day.amount ? 1 : 0.3
                  }}
                ></div>
                <p className="text-xs font-medium mt-1 text-gray-600">{day.day}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-4 py-3 sm:px-6">
        <div className="text-sm">
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            View detailed report <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EarningsOverview; 