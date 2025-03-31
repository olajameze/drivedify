import React, { useState } from 'react';
import { useLessons, Lesson } from '../../contexts/LessonsContext';

const StudentBooking: React.FC = () => {
  const { addLesson } = useLessons();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      // Create Date objects for validation
      const start = new Date(`${selectedDate}T${selectedTime}`);
      const end = new Date(start);
      end.setHours(end.getHours() + 1);

      // Format according to Lesson type requirements
      const newLesson: Omit<Lesson, 'id'> = {
        title: 'New Lesson',
        date: selectedDate, // Directly use the input value
        time: selectedTime, // Directly use the input value
        duration: 1,
        location: 'Driving School',
        type: 'Driving Lesson',
        status: 'scheduled',
        studentId: 'student-id',
        studentName: 'Student Name',
        objectives: [],
        studentProgress: '',
        // Removed start and end properties as they're not part of Lesson type
      };

      addLesson(newLesson);
      console.log(`Booking made for ${selectedDate} at ${selectedTime}`);
      setSelectedDate('');
      setSelectedTime('');
    } else {
      alert('Please select both date and time.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden p-4">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Book a Lesson</h3>
      <label className="mt-2" htmlFor="date">Select Date:</label>
      <input
        id="date"
        type="date"
        className="mt-2 border border-gray-300 rounded p-2"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        min={new Date().toISOString().split('T')[0]} // Prevent past dates
      />
      <label className="mt-2" htmlFor="time">Select Time:</label>
      <input
        id="time"
        type="time"
        className="mt-2 border border-gray-300 rounded p-2"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
        min="09:00"
        max="18:00"
      />
      <button
        className="mt-4 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
        onClick={handleBooking}
      >
        Book Lesson
      </button>
    </div>
  );
};

export default StudentBooking;