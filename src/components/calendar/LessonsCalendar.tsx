import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, addMinutes } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useLessons, Lesson } from '../../contexts/LessonsContext';
import LessonModal from './LessonModal';

// Setup the localizer for react-big-calendar
const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Custom event component for calendar
interface EventProps {
  event: Lesson;
}

const Event = ({ event }: EventProps) => {
  const statusColors = {
    scheduled: 'bg-blue-100 border-blue-600',
    completed: 'bg-green-100 border-green-600',
    canceled: 'bg-gray-100 border-gray-600',
  };

  const borderColor = statusColors[event.status] || statusColors.scheduled;

  return (
    <div className={`rounded px-2 py-1 text-xs ${borderColor} border-l-4 overflow-hidden h-full`}>
      <div className="font-bold truncate">{event.title}</div>
      <div className="truncate">{event.studentName}</div>
    </div>
  );
};

const LessonsCalendar: React.FC = () => {
  const { lessons, isLoading, error } = useLessons();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calendarView, setCalendarView] = useState<typeof Views[keyof typeof Views]>(Views.WEEK);
  const [date, setDate] = useState(new Date());

  const handleSelectEvent = (event: Lesson) => {
    setSelectedLesson(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLesson(null);
  };

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  const handleViewChange = (newView: typeof Views[keyof typeof Views]) => {
    setCalendarView(newView);
  };

  // For time slots in the calendar
  const getTimeSlotProps = (date: Date) => {
    const currentDate = new Date();
    const isToday = 
      date.getDate() === currentDate.getDate() && 
      date.getMonth() === currentDate.getMonth() && 
      date.getFullYear() === currentDate.getFullYear();
    
    const isPast = date < currentDate;
    
    return {
      className: `${isToday ? 'bg-blue-50' : ''} ${isPast ? 'bg-gray-50' : ''}`
    };
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-500">Loading calendar...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-red-500">Error loading calendar: {error.message}</p>
      </div>
    );
  }

  const events = lessons.map(lesson => ({
    id: lesson.id,
    title: lesson.title,
    start: new Date(`${lesson.date}T${lesson.time}`),
    end: addMinutes(new Date(`${lesson.date}T${lesson.time}`), lesson.duration * 60),
    allDay: false,
    studentId: lesson.studentId,
    studentName: lesson.studentId,
    duration: lesson.duration,
    location: lesson.location,
    type: lesson.type,
    status: lesson.status,
  }));

  return (
    <div className="h-[700px]">
      <Calendar
        localizer={localizer}
        events={events as unknown as Lesson[]}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        onSelectEvent={handleSelectEvent}
        view={calendarView}
        onView={handleViewChange}
        date={date}
        onNavigate={handleNavigate}
        components={{
          event: Event
        }}
        eventPropGetter={(event: Lesson) => ({
          style: {
            backgroundColor: 'transparent'
          }
        })}
        slotPropGetter={getTimeSlotProps}
        defaultView={Views.WEEK}
        views={[Views.DAY, Views.WEEK, Views.MONTH, Views.AGENDA]}
        min={new Date(0, 0, 0, 7, 0, 0)} // 7:00 AM
        max={new Date(0, 0, 0, 21, 0, 0)} // 9:00 PM
        step={30}
        timeslots={2}
      />
      
      {selectedLesson && (
        <LessonModal
          lesson={selectedLesson}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default LessonsCalendar; 