import React from 'react';

const UpcomingLessons = ({ lessons }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Upcoming Lessons</h2>
      {lessons.length === 0 ? (
        <p>No upcoming lessons.</p>
      ) : (
        <ul>
          {lessons.map((lesson) => (
            <li key={lesson.id} className="border-b py-2">
              <span>{lesson.date} - {lesson.time} with {lesson.student}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingLessons;
