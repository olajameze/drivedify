import React, { useState } from 'react';
import Link from 'next/link';
import { PlusIcon, ViewListIcon, CalendarIcon } from '@heroicons/react/outline';
import DashboardLayout from '../components/layouts/DashboardLayout';
import dynamic from 'next/dynamic';

// Import the calendar component with client-side only rendering
const LessonsCalendar = dynamic(
  () => import('../components/calendar/LessonsCalendar'),
  { ssr: false }
);

const CalendarPage = () => {
  const [view, setView] = useState<'calendar' | 'list'>('calendar');

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Lesson Calendar
              </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
              {/* View toggle */}
              <div className="inline-flex shadow-sm rounded-md">
                <button
                  type="button"
                  className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    view === 'calendar' 
                      ? 'text-blue-700 bg-blue-50' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setView('calendar')}
                >
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  Calendar
                </button>
                <button
                  type="button"
                  className={`relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    view === 'list' 
                      ? 'text-blue-700 bg-blue-50' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setView('list')}
                >
                  <ViewListIcon className="h-5 w-5 mr-2" />
                  List
                </button>
              </div>

              {/* Add lesson button */}
              <Link 
                href="/lessons/new" 
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                New Lesson
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            {view === 'calendar' ? (
              <div className="p-4">
                <LessonsCalendar />
              </div>
            ) : (
              <div className="p-4">
                <p>List view coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage; 