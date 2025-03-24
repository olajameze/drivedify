import React from 'react'
import UpcomingLessons from './UpcomingLessons';
import StudentProgress from './StudentProgress';
import EarningsOverview from './EarningsOverview';
import Notifications from './Notifications';

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UpcomingLessons />
      <StudentProgress />
      <EarningsOverview />
      <Notifications />
    </div>
  );
};

export default Dashboard;
