import React from 'react';
import { motion } from 'framer-motion';
import { useDashboard } from '../../../contexts/DashboardContext';
import { CurrencyPoundIcon } from '@heroicons/react/24/outline';

export const EarningsOverview: React.FC = () => {
  const { stats, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="h-32 bg-gray-200 rounded" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Earnings Overview</h2>
        <CurrencyPoundIcon className="h-6 w-6 text-gray-400" />
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Monthly Earnings</p>
          <p className="text-2xl font-bold text-gray-900">
            £{stats.monthlyEarnings.toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Completed Lessons</p>
            <p className="text-xl font-semibold text-gray-900">
              {stats.completedLessons}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Average per Lesson</p>
            <p className="text-xl font-semibold text-gray-900">
              £{(stats.monthlyEarnings / stats.completedLessons || 0).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};