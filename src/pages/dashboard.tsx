import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/layouts/DashboardLayout';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import QuickStats from '../components/dashboard/QuickStats';
import UpcomingLessons from '../components/UpcomingLessons';
import StudentProgress from '../components/StudentProgress';
import EarningsOverview from '../components/EarningsOverview';
import Notifications from '../components/Notifications';
import { fetchUpcomingLessons, fetchNotifications } from '../utils/apiService';

const Dashboard = () => {
  const [upcomingLessons, setUpcomingLessons] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loadingLessons, setLoadingLessons] = useState(true);
  const [loadingNotifications, setLoadingNotifications] = useState(true);
  const [errorLessons, setErrorLessons] = useState('');
  const [errorNotifications, setErrorNotifications] = useState('');

  useEffect(() => {
    const getUpcomingLessons = async () => {
      try {
        const data = await fetchUpcomingLessons();
        setUpcomingLessons(data);
      } catch (err) {
        setErrorLessons('Failed to fetch upcoming lessons.');
      } finally {
        setLoadingLessons(false);
      }
    };

    const getNotifications = async () => {
      try {
        const data = await fetchNotifications();
        setNotifications(data);
      } catch (err) {
        setErrorNotifications('Failed to fetch notifications.');
      } finally {
        setLoadingNotifications(false);
      }
    };

    getUpcomingLessons();
    getNotifications();
  }, []);

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <DashboardHeader />
          <QuickStats />
          
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {loadingLessons ? <p>Loading upcoming lessons...</p> : errorLessons ? <p className="text-red-500">{errorLessons}</p> : <UpcomingLessons lessons={upcomingLessons} />}
            <StudentProgress />
          </div>
          
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <EarningsOverview />
            {loadingNotifications ? <p>Loading notifications...</p> : errorNotifications ? <p className="text-red-500">{errorNotifications}</p> : <Notifications notifications={notifications} />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
