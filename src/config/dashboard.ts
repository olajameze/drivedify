import { Widget } from '../types/dashboard';
import { 
  UpcomingLessons,
  StudentProgress,
  EarningsOverview,
  Notifications
} from '../components/dashboard/widgets';

export const defaultWidgets: Widget[] = [
  {
    id: 'upcoming-lessons',
    title: 'Upcoming Lessons',
    component: UpcomingLessons,
    isEnabled: true,
    position: 0
  },
  {
    id: 'student-progress',
    title: 'Student Progress',
    component: StudentProgress,
    isEnabled: true,
    position: 1
  },
  {
    id: 'earnings',
    title: 'Earnings Overview',
    component: EarningsOverview,
    isEnabled: true,
    position: 2
  },
  {
    id: 'notifications',
    title: 'Notifications',
    component: Notifications,
    isEnabled: true,
    position: 3
  }
];