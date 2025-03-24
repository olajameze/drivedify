import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Lesson {
  time: any;
  date: any;
  id: string;
  title: string;
  studentId: string;
  studentName: string;
  start: Date;
  end: Date;
  duration: number;
  location: string;
  type: string;
  status: 'scheduled' | 'completed' | 'canceled';
  notes?: string;
  color?: string;
}

interface LessonsContextType {
  lessons: Lesson[];
  isLoading: boolean;
  error: Error | null;
  fetchLessons: () => Promise<void>;
  addLesson: (lesson: Omit<Lesson, 'id'>) => Promise<Lesson>;
  updateLesson: (id: string, lessonData: Partial<Lesson>) => Promise<Lesson>;
  deleteLesson: (id: string) => Promise<void>;
  getStudentLessons: (studentId: string) => Lesson[];
}

export type LessonsContext = ReturnType<typeof createContext<LessonsContextType | undefined>>;

const LessonsContext = createContext<LessonsContextType | undefined>(undefined);

export const useLessons = () => {
  const context = useContext(LessonsContext);
  if (!context) {
    throw new Error('useLessons must be used within a LessonsProvider');
  }
  return context;
};

// Mock lesson colors based on lesson type
const getLessonColor = (type: string): string => {
  switch (type) {
    case 'Basic Control':
      return '#3B82F6'; // blue-500
    case 'City Driving':
      return '#8B5CF6'; // indigo-500
    case 'Highway Driving':
      return '#10B981'; // emerald-500
    case 'Parallel Parking':
      return '#F59E0B'; // amber-500
    case 'Maneuvers':
      return '#EC4899'; // pink-500
    case 'Mock Test':
      return '#EF4444'; // red-500
    case 'Test Preparation':
      return '#6366F1'; // indigo-500
    default:
      return '#6B7280'; // gray-500
  }
};

interface LessonsProviderProps {
  children: ReactNode;
}

export const LessonsProvider: React.FC<LessonsProviderProps> = ({ children }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchLessons = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/lessons');
      const data = await response.json();
      setLessons(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const addLesson = async (lesson: Omit<Lesson, 'id'>): Promise<Lesson> => {
    const newLesson = { 
      ...lesson,
      id: Math.random().toString(36).substring(2, 9),
      color: getLessonColor(lesson.type)
    };
    setLessons(prev => [...prev, newLesson]);
    return newLesson;
  };

  const updateLesson = async (id: string, lessonData: Partial<Lesson>): Promise<Lesson> => {
    setLessons(prev => prev.map(l => {
      if (l.id === id) {
        const updatedColor = lessonData.type ? getLessonColor(lessonData.type) : l.color;
        return { ...l, ...lessonData, color: updatedColor };
      }
      return l;
    }));
    return { id, ...lessonData } as Lesson;
  };

  const deleteLesson = async (id: string): Promise<void> => {
    setLessons(prev => prev.filter(l => l.id !== id));
  };

  const getStudentLessons = (studentId: string): Lesson[] => {
    return lessons.filter(l => l.studentId === studentId);
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const contextValue: LessonsContextType = {
    lessons,
    isLoading,
    error,
    fetchLessons,
    addLesson,
    updateLesson,
    deleteLesson,
    getStudentLessons
  };

  return (
    <LessonsContext.Provider value={contextValue}>
      {children}
    </LessonsContext.Provider>
  );
};

export default LessonsProvider;