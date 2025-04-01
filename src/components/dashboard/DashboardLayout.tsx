import React from 'react';
import { motion } from 'framer-motion';
import { useDashboard } from '../../contexts/DashboardContext';
import SideNav from '../navigation/SideNav';
import TopBar from '../navigation/TopBar';
import DashboardWidgets from './DashboardWidgets';
import ErrorBoundary from '../ErrorBoundary';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { sidebarOpen, isLoading, error } = useDashboard();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-red-600 text-center">
          <h2 className="text-2xl font-bold mb-2">Error Loading Dashboard</h2>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-y-0 left-0 z-30"
      >
        <SideNav />
      </motion.div>

      <div className="flex-1 overflow-auto">
        <TopBar />
        <main className="relative">
          <div className={`p-6 ${sidebarOpen ? 'ml-64' : ''}`}>
            <ErrorBoundary>
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-32 bg-gray-200 rounded-lg" />
                  <div className="h-64 bg-gray-200 rounded-lg" />
                </div>
              ) : (
                <>
                  <DashboardWidgets />
                  {children}
                </>
              )}
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
