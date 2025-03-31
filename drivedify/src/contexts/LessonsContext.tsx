import React, { createContext, useContext, useState } from 'react';

export interface Lesson {
  id: string;
  title: string;
  date: string; // ISO format
  time: string; // HH:MM format
  duration: number;
  location: string;
  type: string;
  status: 'scheduled' | 'completed' | 'canceled';
  notes?: string;
  objectives: string[];
  studentProgress: string;
  studentId: string;
  studentName: string;
}

interface LessonsContextType {
  lessons: Lesson[];
  addLesson: (lesson: Omit<Lesson, 'id'>) => Promise<void>;
}

const LessonsContext = createContext<LessonsContextType | undefined>(undefined);

export const LessonsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);

  const addLesson = async (lesson: Omit<Lesson, 'id'>) => {
    // Simulate adding a lesson (you would typically make an API call here)
    const newLesson = { ...lesson, id: String(lessons.length + 1) }; // Simple ID generation
    setLessons(prevLessons => [...prevLessons, newLesson]);
  };

  return (
    <LessonsContext.Provider value={{ lessons, addLesson }}>
      {children}
    </LessonsContext.Provider>
  );
};

export const useLessons = () => {
  const context = useContext(LessonsContext);
  if (!context) {
    throw new Error('useLessons must be used within a LessonsProvider');
  }
  return context;
};
