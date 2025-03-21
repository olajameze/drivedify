import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Lesson {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  studentId: string;
  student: string;
}

interface LessonsContextValue {
  lessons: Lesson[];
  setLessons: React.Dispatch<React.SetStateAction<Lesson[]>>;
}

const LessonsContext = createContext<LessonsContextValue>({
  lessons: [],
  setLessons: () => {}
});

export const useLessons = () => useContext(LessonsContext);

interface LessonsProviderProps {
  children: ReactNode;
}

export const LessonsProvider: React.FC<LessonsProviderProps> = ({ children }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  
  return (
    <LessonsContext.Provider value={{ lessons, setLessons }}>
      {children}
    </LessonsContext.Provider>
  );
};