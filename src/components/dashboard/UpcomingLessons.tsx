import React, { useEffect, useState } from 'react';
import { CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useLessons, Lesson } from '../../contexts/LessonsContext';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
interface LessonWithDate extends Lesson { date: Date }
const UpcomingLessons: React.FC = () => {
  const { lessons } = useLessons();
  const [formattedDates, setFormattedDates] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/lessons`);
        const data: Lesson[] = await response.json();
        const lessonsWithDate = data.map((lesson: Lesson) => ({
          ...lesson,
          date: new Date(lesson.date)
        })) as LessonWithDate[];

        
        setError(null);
      } catch (err) {
        console.error('Error fetching upcoming lessons:', err);
        setError('Failed to load upcoming lessons. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchLessons();
  }, []);

  useEffect(() => {
    const dates: Record<string, string> = {};
    lessons.forEach((lesson: Lesson) => {
      const date = new Date(lesson.date); 
      dates[lesson.id] = date.toLocaleDateString('en-GB', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short' 
      });
    });
    setFormattedDates(dates);
  }, [lessons]);

  if (isLoading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading upcoming lessons...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 sm:px-6 bg-blue-50 border-b border-blue-100">
        <h3 className="text-lg leading-6 font-medium text-blue-900 flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2 text-blue-500" />
          Upcoming Lessons
        </h3>
        <p className="mt-1 text-sm text-blue-600">Your next scheduled lessons with students</p>
      </div>
      
      {lessons.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No upcoming lessons scheduled
        </div>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {lessons.map((lesson: Lesson) => (
              <li key={lesson.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-full p-2 mr-4">
                      <UserIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{lesson.studentName}</p>
                      <div className="flex items-center mt-1">
                        <ClockIcon className="h-4 w-4 text-gray-400 mr-1" />
                        <p className="text-xs text-gray-500">
                          {lesson.startTime ? lesson.startTime : 'N/A'} - {lesson.endTime ? lesson.endTime : 'N/A'} ({lesson.duration ? lesson.duration : 'N/A'} hr{lesson.duration && lesson.duration !== 1 ? 's' : ''})
                        </p> 
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {formattedDates[lesson.id] || new Date(lesson.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">{lesson.title || 'General Driving'}</p>



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
        </>
      )}
    </div>
  );
}
export default UpcomingLessons;
