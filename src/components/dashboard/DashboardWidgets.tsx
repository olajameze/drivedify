import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon, 
  CurrencyPoundIcon,
  CalendarIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline';

interface Widget {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
  change: string;
}

const DashboardWidgets: React.FC = () => {
  const widgets: Widget[] = [
    {
      title: 'Total Students',
      value: '24',
      icon: UserGroupIcon,
      color: 'bg-blue-500',
      change: '+2 this week'
    },
    {
      title: 'Monthly Earnings',
      value: '£2,450',
      icon: CurrencyPoundIcon,
      color: 'bg-green-500',
      change: '+£320 vs last month'
    },
    {
      title: 'Upcoming Lessons',
      value: '8',
      icon: CalendarIcon,
      color: 'bg-purple-500',
      change: 'Next: Today at 2PM'
    },
    {
      title: 'Average Student Progress',
      value: '73%',
      icon: ChartBarIcon,
      color: 'bg-yellow-500',
      change: '+5% this month'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {widgets.map((widget, index) => (
        <motion.div
          key={widget.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between">
            <div className={`${widget.color} p-3 rounded-lg`}>
              <widget.icon className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-500">{widget.change}</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-900">{widget.value}</h3>
          <p className="mt-1 text-sm text-gray-600">{widget.title}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardWidgets;
