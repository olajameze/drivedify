import React from 'react';
import { motion } from 'framer-motion';
import SideNav from '../navigation/SideNav';
import TopBar from '../navigation/TopBar';
import { useDashboard } from '../../contexts/DashboardContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { sidebarOpen } = useDashboard();

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-y-0 left-0 z-30"
      >
        <SideNav />
      </motion.div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <TopBar />
        <main className="relative">
          <div className={`p-6 ${sidebarOpen ? 'ml-64' : ''}`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
