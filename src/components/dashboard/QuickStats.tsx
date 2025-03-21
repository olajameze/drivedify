import React from 'react';
import { 
  UserGroupIcon, 
  CalendarIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon 
} from '@heroicons/react/outline';

interface QuickStatsProps {}

const QuickStats: React.FC<QuickStatsProps> = () => {
  // Normally these would be fetched from an API
  const stats = [
    { name: 'Total Students', value: '24', icon: UserGroupIcon, change: '+2 this month', color: 'bg-blue-500' },
    { name: 'Upcoming Lessons', value: '12', icon: CalendarIcon, change: '3 today', color: 'bg-green-500' },
    { name: 'Monthly Earnings', value: '£1,254', icon: CurrencyDollarIcon, change: '+12% from last month', color: 'bg-yellow-500' },
    { name: 'Test Pass Rate', value: '86%', icon: ChartBarIcon, change: '+4% from average', color: 'bg-pink-500' },
  ];

  return (
    <div>
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative bg-white pt-5 px-4 pb-6 sm:pt-6 sm:px-6 rounded-lg shadow overflow-hidden"
          >
            <dt>
              <div className={`absolute rounded-md p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p className="ml-2 flex items-baseline text-sm font-medium text-gray-500">
                <span className="text-xs text-gray-400 ml-1">{stat.change}</span>
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default QuickStats; 