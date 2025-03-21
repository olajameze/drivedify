import React, { useEffect, useState } from 'react';
import { CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useLessons } from '../../contexts/LessonsContext';
import axios from 'axios'; // Ensure axios is imported
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Define API_BASE_URL

const UpcomingLessons: React.FC = () => {
  const { lessons, setLessons } = useLessons();

  interface Lesson {
    id: string;
    student: string;
    date: string;
    time: string;
    duration: number;
    location: string;
    type: string;
  }

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/upcoming-lessons`);
        setLessons(response.data);
      } catch (err) {
        console.error('Error fetching upcoming lessons:', err);
      }
    };

    fetchLessons();
  }, [setLessons]);

  const lessonsData: Lesson[] = [
    {
      id: '1',
      student: 'Sarah Johnson',
      date: '2023-05-18',
      time: '09:00',
      duration: 2,
      location: 'City Center',
      type: 'Highway Driving'
    },
    {
      id: '2',
      student: 'Michael Brown',
      date: '2023-05-18',
      time: '12:00',
      duration: 1,
      location: 'Suburb Area',
      type: 'Parallel Parking'
    },
    {
      id: '3',
      student: 'Emily Wilson',
      date: '2023-05-19',
      time: '10:00',
      duration: 2,
      location: 'Test Center',
      type: 'Mock Test'
    },
    {
      id: '4',
      student: 'David Lee',
      date: '2023-05-20',
      time: '14:00',
      duration: 1.5,
      location: 'Shopping Mall',
      type: 'City Driving'
    }
  ];

  // Use client-side formatting to avoid hydration issues
  const [formattedDates, setFormattedDates] = useState<Record<string, string>>({});

  useEffect(() => {
    // Format dates on client side to avoid hydration mismatch
    const dates: Record<string, string> = {};
    lessons.forEach(lesson => {
      const date = new Date(lesson.date);
      dates[lesson.id] = date.toLocaleDateString('en-GB', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short' 
      });
    });
    setFormattedDates(dates);
  }, [lessons]);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 sm:px-6 bg-blue-50 border-b border-blue-100">
        <h3 className="text-lg leading-6 font-medium text-blue-900 flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2 text-blue-500" />
          Upcoming Lessons
        </h3>
        <p className="mt-1 text-sm text-blue-600">Your next scheduled lessons with students</p>
      </div>
      <ul className="divide-y divide-gray-200">
        {lessons.map((lesson) => (
          <li key={lesson.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-2 mr-4">
                  <UserIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{lesson.student}</p>
                  <div className="flex items-center mt-1">
                    <ClockIcon className="h-4 w-4 text-gray-400 mr-1" />
                    <p className="text-xs text-gray-500">{lesson.time} - {lesson.duration} hr{lesson.duration > 1 ? 's' : ''}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{formattedDates[lesson.id] || lesson.date}</p>
                <p className="mt-1 text-xs text-gray-500">{lesson.type}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="bg-gray-50 px-4 py-3 sm:px-6">
        <div className="text-sm">
          <Link href="/lessons" className="font-medium text-blue-600 hover:text-blue-500">
            View all lessons <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpcomingLessons;