import React from 'react';
import { DashboardProvider } from '../contexts/DashboardContext';
import DashboardLayout from '../components/layouts/DashboardLayout';
import QuickStats from '../components/dashboard/QuickStats';
import UpcomingLessons from '../components/dashboard/UpcomingLessons';
import EarningsOverview from '../components/dashboard/EarningsOverview';
import Notifications from '../components/dashboard/Notifications';

const Dashboard: React.FC = () => {
  return (
    <DashboardProvider>
      <DashboardLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickStats />
          <div className="md:col-span-2 lg:col-span-4">
            <div className="grid gap-6 md:grid-cols-2">
              <UpcomingLessons />
              <EarningsOverview />
            </div>
          </div>
          <div className="md:col-span-2 lg:col-span-4">
            <Notifications />
          </div>
        </div>
      </DashboardLayout>
    </DashboardProvider>
  );
};

export default Dashboard;
