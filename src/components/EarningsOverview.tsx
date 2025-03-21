import React from 'react';

const EarningsOverview = () => {
  // Sample data for earnings
  const earnings = [
    { id: 1, date: '2023-09-30', amount: 150, lessons: 5 },
    { id: 2, date: '2023-10-01', amount: 200, lessons: 6 },
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Earnings Overview</h2>
      <ul>
        {earnings.map((earning) => (
          <li key={earning.id} className="border-b py-2">
            <span>{earning.date}: ${earning.amount} for {earning.lessons} lessons</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EarningsOverview;
