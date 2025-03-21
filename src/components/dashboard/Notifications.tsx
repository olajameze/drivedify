import React from 'react';
import { BellIcon } from '@heroicons/react/outline';

interface Notification {
  id: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
}

const Notifications: React.FC = () => {
  // Mock data - would come from API in real app
  const notifications: Notification[] = [
    {
      id: '1',
      message: 'Sarah Johnson rescheduled her lesson to tomorrow at 10:00',
      time: '10 minutes ago',
      type: 'info',
      read: false
    },
    {
      id: '2',
      message: 'New booking request from Michael Brown',
      time: '1 hour ago',
      type: 'success',
      read: false
    },
    {
      id: '3',
      message: 'Emily Wilson passed her driving test!',
      time: '3 hours ago',
      type: 'success',
      read: false
    },
    {
      id: '4',
      message: 'Your monthly report is ready to view',
      time: '1 day ago',
      type: 'info',
      read: true
    }
  ];

  // Get notification color based on type
  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'success': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 sm:px-6 bg-blue-50 border-b border-blue-100">
        <h3 className="text-lg leading-6 font-medium text-blue-900 flex items-center">
          <BellIcon className="h-5 w-5 mr-2 text-blue-500" />
          Notifications
        </h3>
        <p className="mt-1 text-sm text-blue-600">
          Recent updates and alerts
        </p>
      </div>
      <ul className="divide-y divide-gray-200">
        {notifications.map((notification) => (
          <li key={notification.id} className={`px-4 py-4 sm:px-6 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}>
            <div className="flex items-start">
              <div className={`flex-shrink-0 rounded-full h-2 w-2 mt-1.5 ${notification.read ? 'bg-gray-300' : 'bg-blue-600'}`}></div>
              <div className="ml-3 flex-1">
                <p className="text-sm text-gray-800">{notification.message}</p>
                <p className="mt-1 text-xs text-gray-500">{notification.time}</p>
              </div>
              <div className="ml-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getNotificationColor(notification.type)}`}>
                  {notification.type}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-between items-center">
        <div className="text-sm">
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            View all notifications
          </a>
        </div>
        <div className="text-sm">
          <button className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none">
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications; 