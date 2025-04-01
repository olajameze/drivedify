export interface DashboardStats {
  totalStudents: number;
  upcomingLessons: number;
  monthlyEarnings: number;
  testPassRate: number;
  completedLessons: number;
}

export interface Widget {
  id: string;
  title: string;
  component: React.FC;
  isEnabled: boolean;
  position: number;
}

export interface DashboardState {
  stats: DashboardStats;
  sidebarOpen: boolean;
  isLoading: boolean;
  error: Error | null;
  toggleSidebar: () => void;
}

export type LessonStatus = 'scheduled' | 'completed' | 'canceled';

export interface Lesson {
  id: string;
  studentName: string;
  date: Date;
  duration: number;
  location: string;
}

export interface Student {
  id: string;
  name: string;
  progress: number;
  lessonsCompleted: number;
}

export interface Earnings {
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
}

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: Date;
}
