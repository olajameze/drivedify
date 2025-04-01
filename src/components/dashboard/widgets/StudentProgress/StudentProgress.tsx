import React from 'react';
import { motion } from 'framer-motion';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { useDashboard } from '../../../../contexts/DashboardContext';

interface Student {
  id: string;
  name: string;
  progress: number;
  lastLesson: string;
  readiness: 'ready' | 'preparing' | 'needs-practice';
}

export const StudentProgress: React.FC = () => {
  const { isLoading } = useDashboard();

  const students: Student[] = [
    {
      id: '1',
      name: 'John Doe',
      progress: 85,
      lastLesson: '2024-04-01',
      readiness: 'ready'
    },
    {
      id: '2',
      name: 'Jane Smith',
      progress: 65,
      lastLesson: '2024-04-01',
      readiness: 'preparing'
    }
  ];

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Student Progress</h2>
        <AcademicCapIcon className="h-6 w-6 text-gray-400" />
      </div>

      <div className="space-y-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-gray-900">{student.name}</p>
                <span className="text-sm text-gray-500">
                  {new Date(student.lastLesson).toLocaleDateString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${student.progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-500">{student.progress}% Complete</span>
                <span className={`text-sm px-2 py-1 rounded ${
                  student.readiness === 'ready' 
                    ? 'bg-green-100 text-green-800'
                    : student.readiness === 'preparing'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {student.readiness.charAt(0).toUpperCase() + student.readiness.slice(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};