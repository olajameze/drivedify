import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon, 
  CurrencyPoundIcon,
  CalendarIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline';
import { useLessons } from '../../contexts/LessonsContext';
import Link from 'next/link';

interface Widget {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  change: string;
  link: string;
}

const DashboardWidgets: React.FC = () => {
  const { lessons, isLoading, error } = useLessons();

  // Calculate widget values
  const totalStudents = new Set(lessons.map(lesson => lesson.studentId)).size;
  const completedLessons = lessons.filter(lesson => lesson.status === 'completed');
  const upcomingLessons = lessons.filter(lesson => 
    lesson.status === 'scheduled' && new Date(lesson.date) > new Date()
  );
  
  const monthlyEarnings = completedLessons.reduce((sum, lesson) => 
    sum + (lesson.duration * 30), // Assuming £30 per hour
    0
  );

  const averageProgress = lessons.length > 0
    ? Math.round(lessons.reduce((sum, lesson) => 
        sum + parseInt(lesson.studentProgress || '0', 10), 
        0
      ) / lessons.length)
    : 0;

  const widgets: Widget[] = [
    {
      title: 'Total Students',
      value: totalStudents,
      icon: UserGroupIcon,
      color: 'bg-blue-500',
      change: `${totalStudents > 0 ? '+' : ''}${totalStudents} active`,
      link: '/students'
    },
    {
      title: 'Monthly Earnings',
      value: `£${monthlyEarnings}`,
      icon: CurrencyPoundIcon,
      color: 'bg-green-500',
      change: `${completedLessons.length} lessons completed`,
      link: '/earnings'
    },
    {
      title: 'Upcoming Lessons',
      value: upcomingLessons.length,
      icon: CalendarIcon,
      color: 'bg-purple-500',
      change: `Next: ${upcomingLessons[0]?.date ? new Date(upcomingLessons[0].date).toLocaleDateString() : 'None'}`,
      link: '/calendar'
    },
    {
      title: 'Average Progress',
      value: `${averageProgress}%`,
      icon: ChartBarIcon,
      color: 'bg-yellow-500',
      change: `Based on ${lessons.length} lessons`,
      link: '/progress'
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="h-32 bg-gray-100 rounded-lg animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Error loading dashboard data: {error.message}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {widgets.map((widget, index) => (
        <Link href={widget.link} key={widget.title}>
          <motion.div
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div className={`${widget.color} p-3 rounded-lg`}>
                <widget.icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-500">{widget.change}</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-semibold text-gray-900">
                {widget.value}
              </h3>
              <p className="mt-1 text-sm text-gray-600">{widget.title}</p>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

export default DashboardWidgets;
