import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';

export interface Lesson {
  id: string;
  title: string;
  studentId: string;
  studentName: string;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number;
  objectives: string[];
  studentProgress: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  location?: string;
  type?: string;
  notes?: string;
  color?: string;
}

export interface LessonsContextType {
  lessons: Lesson[];
  setLessons: React.Dispatch<React.SetStateAction<Lesson[]>>;
  isLoading: boolean;
  error: Error | null;
  fetchLessons: () => Promise<void>;
  addLesson: (lesson: Omit<Lesson, 'id'>) => Promise<void>;
  updateLesson: (id: string, lessonData: Partial<Lesson>) => Promise<void>;
  deleteLesson: (id: string) => Promise<void>;
  getStudentLessons: (studentId: string) => Lesson[];
}

const initialContext: LessonsContextType = {
  lessons: [],
  setLessons: () => {
    throw new Error('setLessons must be used within LessonsProvider');
  },
  isLoading: false,
  error: null,
  fetchLessons: async () => {},
  addLesson: async () => {},
  updateLesson: async () => {},
  deleteLesson: async () => {},
  getStudentLessons: () => []
};

export const LessonsContext = createContext<LessonsContextType>(initialContext);

export const LessonsProvider = ({ children }: { children: ReactNode }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchLessons = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons`);
      if (!response.ok) throw new Error('Failed to fetch lessons');
      const data = await response.json();
      setLessons(data.map((lesson: any) => ({
        ...lesson,
        date: new Date(lesson.date)
      })));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch lessons'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const addLesson = async (lesson: Omit<Lesson, 'id'>) => {
    const newLesson: Lesson = {
      ...lesson,
      id: Math.random().toString(36).substring(2, 9)
    };
    setLessons(prev => [...prev, newLesson]);
  };

  const updateLesson = async (id: string, lessonData: Partial<Lesson>) => {
    setLessons(prev => prev.map(lesson => lesson.id === id ? { ...lesson, ...lessonData } : lesson));
  };

  const deleteLesson = async (id: string) => {
    setLessons(prev => prev.filter(lesson => lesson.id !== id));
  };

  const methods = useMemo(() => ({
    fetchLessons,
    addLesson,
    updateLesson,
    deleteLesson,
    getStudentLessons: (studentId: string) => 
      lessons.filter(lesson => lesson.studentName === studentId)
  }), [lessons]);

  const contextValue = useMemo(() => ({
    lessons,
    setLessons,
    isLoading,
    error,
    ...methods
  }), [lessons, isLoading, error, methods]);

  return (
    <div className="lessons-provider-wrapper">
      <LessonsContext.Provider value={contextValue}>
        <div className="lessons-provider-content">
          {children}
        </div>
      </LessonsContext.Provider>
    </div>
  );
};

export const useLessons = (): LessonsContextType => {
  const context = useContext(LessonsContext);
  if (!context) {
    throw new Error('useLessons must be used within a LessonsProvider');
  }
  return context;
};

export default LessonsProvider;
