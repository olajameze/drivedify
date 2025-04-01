export { UpcomingLessons } from './UpcomingLessons';
export { StudentProgress } from './StudentProgress';
export { EarningsOverview } from './EarningsOverview';
export { Notifications } from './Notifications';

// Add widget configuration type
export interface WidgetConfig {
  id: string;
  title: string;
  description: string;
  component: React.FC;
  defaultPosition: number;
  isEnabled: boolean;
}
