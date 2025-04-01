import React from 'react';
import { DashboardProvider } from '../../contexts/DashboardContext';
import { LessonsProvider } from '../../contexts/LessonsContext';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import DashboardWidgets from '../../components/dashboard/DashboardWidgets';
import { 
  UpcomingLessons,
  StudentProgress,
  Earnings,
  Notifications 
} from '../../components/dashboard/widgets';

const DashboardPage = () => {
  return (
    <DashboardProvider>
      <LessonsProvider>
        <DashboardLayout>
          <div className="space-y-6">
            {/* Quick stats */}
            <DashboardWidgets />
            
            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <UpcomingLessons />
              <StudentProgress />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Earnings />
              <Notifications />
            </div>
          </div>
        </DashboardLayout>
      </LessonsProvider>
    </DashboardProvider>
  );
};

export default DashboardPage;
