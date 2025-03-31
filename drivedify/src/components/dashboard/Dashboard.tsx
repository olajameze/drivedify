import React from 'react';
import UpcomingLessons from './UpcomingLessons';
import Notifications from './Notifications';
import EarningsOverview from './EarningsOverview';
import LessonsCalendar from '../calendar/LessonsCalendar'; // Import the LessonsCalendar component
import PaymentTracker from './PaymentTracker'; // Import the PaymentTracker component
import LessonNotes from './LessonNotes'; // Import the LessonNotes component
import DrivingTheoryQuiz from './DrivingTheoryQuiz'; // Import the DrivingTheoryQuiz component
import InstructorCommunity from './InstructorCommunity'; // Import the InstructorCommunity component
import StudentBooking from './StudentBooking'; // Import the StudentBooking component

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UpcomingLessons />
      <Notifications />
      <EarningsOverview />
      <LessonsCalendar /> {/* Add the LessonsCalendar component here */}
      <PaymentTracker /> {/* Add the PaymentTracker component here */}
      <LessonNotes /> {/* Add the LessonNotes component here */}
      <DrivingTheoryQuiz /> {/* Add the DrivingTheoryQuiz component here */}
      <InstructorCommunity /> {/* Add the InstructorCommunity component here */}
      <StudentBooking /> {/* Add the StudentBooking component here */}
    </div>
  );
};

export default Dashboard;