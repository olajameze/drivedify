import React from 'react';
import { ChartBarIcon } from '@heroicons/react/outline';

interface Student {
  id: string;
  name: string;
  progress: number;
  lastLesson: string;
  nextTest: string;
}

const StudentProgress: React.FC = () => {
  // Mock data - would come from API in real app
  const students: Student[] = [
    { id: '1', name: 'Sarah Johnson', progress: 85, lastLesson: '2023-05-15', nextTest: '2023-06-10' },
    { id: '2', name: 'Michael Brown', progress: 62, lastLesson: '2023-05-16', nextTest: '2023-06-22' },
    { id: '3', name: 'Emily Wilson', progress: 91, lastLesson: '2023-05-14', nextTest: '2023-05-28' },
    { id: '4', name: 'David Lee', progress: 45, lastLesson: '2023-05-13', nextTest: 'Not scheduled' }
  ];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 sm:px-6 bg-blue-50 border-b border-blue-100">
        <h3 className="text-lg leading-6 font-medium text-blue-900 flex items-center">
          <ChartBarIcon className="h-5 w-5 mr-2 text-blue-500" />
          Student Progress
        </h3>
        <p className="mt-1 text-sm text-blue-600">Track your students' learning progress</p>
      </div>
      <div className="p-4 sm:px-6">
        {students.map((student) => (
          <div key={student.id} className="mb-4 last:mb-0">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">{student.name}</span>
              <span className="text-sm font-medium text-gray-700">{student.progress}%</span>
            </div>
            <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${student.progress}%` }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                  student.progress < 50 ? 'bg-red-500' : student.progress < 75 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Last Lesson: {new Date(student.lastLesson).toLocaleDateString()}</span>
              <span>Test: {student.nextTest}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6">
        <div className="text-sm">
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            View all students <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default StudentProgress; 