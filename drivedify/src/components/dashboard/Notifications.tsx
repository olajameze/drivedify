import React, { FC } from 'react';
import { useLessons } from '../../contexts/LessonsContext';

const Notifications: FC = () => {
  const { lessons } = useLessons();
  const notifications = lessons.filter(lesson => lesson.status !== 'completed');

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 sm:px-6 bg-blue-50 border-b border-blue-100">
        <h3 className="text-lg leading-6 font-medium text-blue-900 flex items-center">
          Notifications
        </h3>
        <p className="mt-1 text-sm text-blue-600">
          Stay updated with your lesson notifications.
        </p>
      </div>
      <div className="p-4">
        {notifications.length > 0 ? (
          notifications.map((lesson) => (
            <div key={lesson.id} className="text-blue-900">
              <p>
                Lesson on {new Date(lesson.date).toLocaleDateString()} at {lesson.time} is {lesson.status}.
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Student: {lesson.studentName}
              </p>
            </div>
          ))
        ) : (
          <p className="text-blue-900">No notifications available.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
