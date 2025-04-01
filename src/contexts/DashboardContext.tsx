import React, { createContext, useContext, useState, useEffect } from 'react';
import { DashboardState, DashboardStats } from '../types/dashboard';

const initialStats: DashboardStats = {
  totalStudents: 0,
  upcomingLessons: 0,
  monthlyEarnings: 0,
  testPassRate: 0,
  completedLessons: 0
};

const DashboardContext = createContext<DashboardState | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<DashboardStats>(initialStats);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/dashboard');
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.message);
        
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DashboardContext.Provider value={{ 
      stats, 
      sidebarOpen, 
      isLoading, 
      error, 
      toggleSidebar 
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
