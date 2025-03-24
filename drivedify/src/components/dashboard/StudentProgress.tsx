import React from 'react';

const StudentProgress: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 sm:px-6 bg-green-50 border-b border-green-100">
        <h3 className="text-lg leading-6 font-medium text-green-900">Student Progress</h3>
        <p className="mt-1 text-sm text-green-600">Track student progress and readiness for driving tests.</p>
      </div>
      <div className="p-4">
        {/* Placeholder for student progress data */}
        <p>No progress data available.</p>
      </div>
    </div>
  );
};

export default StudentProgress;
