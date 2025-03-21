import React from 'react';

const Notifications = ({ notifications }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className="border-b py-2">
              <span>{notification.message}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
