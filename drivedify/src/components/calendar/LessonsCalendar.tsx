import React, { useState } from 'react';
import { Calendar, momentLocalizer, stringOrDate } from 'react-big-calendar';
import moment from 'moment';
import { useLessons } from '../../contexts/LessonsContext';
import 'react-big-calendar/lib/css/react-big-calendar.css';

type Event = {
  id: string;
  title: string;
  start: Date;
  end: Date;
};

const localizer = momentLocalizer(moment);

const LessonsCalendar: React.FC = () => {
  const { lessons } = useLessons();
  const [events, setEvents] = useState<Event[]>(
    lessons.map(lesson => ({
      id: String(lesson.id),
      title: lesson.title,
      start: new Date(`${lesson.date}T${lesson.time}`),
      end: new Date(new Date(`${lesson.date}T${lesson.time}`).getTime() + lesson.duration * 60 * 1000),
    }))
  );

  const handleSelectSlot = (slotInfo: { start: stringOrDate; end: stringOrDate }) => {
    const title = window.prompt('New Lesson Title');
    if (title) {
      const newEvent: Event = {
        id: String(events.length + 1),
        title,
        start: new Date(slotInfo.start),
        end: new Date(slotInfo.end),
      };
      setEvents([...events, newEvent]);
    }
  };

  return (
    <div className="p-4">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSelectSlot}
      />
    </div>
  );
};

export default LessonsCalendar;