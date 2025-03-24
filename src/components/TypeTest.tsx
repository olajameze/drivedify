import React from 'react';
import { useLessons } from '../contexts/LessonsContext';

export const TypeTest: React.FC = () => {
  const { lessons, loading, error, addLesson, updateLesson, deleteLesson } = useLessons();

  // Test type safety
  const testLesson: Omit<typeof lessons[0], 'id'> = {
    title: 'Test Lesson',
    date: new Date(),
    duration: 60,
    objectives: ['Learn something'],
    studentProgress: 'In progress',
    status: 'scheduled'
  };

  // Test all functions
  const handleTest = async () => {
    try {
      await addLesson(testLesson);
      updateLesson('some-id', { title: 'Updated Title' });
      deleteLesson('some-id');
    } catch (error) {
      console.error('Type test error:', error);
    }
  };

  return (
    <div>
      <h1>Type Test Component</h1>
      <p>Loading: {loading.toString()}</p>
      <p>Error: {error || 'None'}</p>
      <button onClick={handleTest}>Run Type Tests</button>
    </div>
  );
};
