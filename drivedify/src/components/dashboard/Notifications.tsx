import React from 'react';

const Notifications: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 sm:px-6 bg-red-50 border-b border-red-100">
        <h3 className="text-lg leading-6 font-medium text-red-900">Notifications</h3>
        <p className="mt-1 text-sm text-red-600">Stay updated with your lesson notifications.</p>
      </div>
      <div className="p-4">
        {/* Placeholder for notifications data */}
        <p>No notifications available.</p>
      </div>
    </div>
  );
};

export default Notifications;
