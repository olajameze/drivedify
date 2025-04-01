export interface DashboardStats {
  totalStudents: number;
  upcomingLessons: number;
  monthlyEarnings: number;
  testPassRate: number;
}

export interface DashboardState {
  stats: DashboardStats;
  activeWidgets: string[];
  setActiveWidgets: (widgets: string[]) => void;
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
