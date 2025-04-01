import React from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import { useLessons } from '../../../../contexts/LessonsContext';
import Link from 'next/link';

export const UpcomingLessons: React.FC = () => {
  const { lessons, isLoading } = useLessons();

  // Filter and sort upcoming lessons
  const upcomingLessons = lessons
    .filter(lesson => 
      lesson.status === 'scheduled' && 
      new Date(lesson.date) >= new Date()
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3); // Show only next 3 lessons

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
        <h2 className="text-lg font-semibold text-gray-900">Upcoming Lessons</h2>
        <CalendarIcon className="h-6 w-6 text-gray-400" />
      </div>

      <div className="space-y-4">
        {upcomingLessons.length > 0 ? (
          upcomingLessons.map((lesson) => (
            <Link
              key={lesson.id}
              href={`/lessons/${lesson.id}`}
              className="block"
            >
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{lesson.studentName}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <ClockIcon className="h-4 w-4" />
                      <span>{lesson.startTime}</span>
                      <span>({lesson.duration}hr)</span>
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(lesson.date).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">No upcoming lessons</p>
        )}
      </div>
      
      <Link 
        href="/calendar" 
        className="mt-4 block text-center text-sm text-blue-600 hover:text-blue-800"
      >
        View all lessons
      </Link>
    </motion.div>
  );
};