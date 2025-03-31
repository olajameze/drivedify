import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';

export interface Lesson {
  endTime: string;
  startTime: string;
  studentName: string;
  id: string;
  title: string;
  date: Date;
  duration: number;
  objectives: string[];
  studentProgress: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  location?: string;
  type?: string;
  notes?: string;
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
    throw new Error('setLessons not implemented');
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

export const LessonsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchLessons = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons`);
      if (!response.ok) {
        throw new Error('Failed to fetch lessons');
      }
      const data = await response.json();
      setLessons(data.map((lesson: any) => ({
        ...lesson,
        date: new Date(lesson.date)
      })));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  const addLesson = async (lesson: Omit<Lesson, 'id'>) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lesson),
      });
      if (!response.ok) {
        throw new Error('Failed to add lesson');
      }
      const newLesson = await response.json();
      setLessons(prev => [...prev, { ...newLesson, date: new Date(newLesson.date) }]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add lesson'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateLesson = async (id: string, lessonData: Partial<Lesson>) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lessonData),
      });
      if (!response.ok) {
        throw new Error('Failed to update lesson');
      }
      setLessons(prev => prev.map(lesson => 
        lesson.id === id ? { ...lesson, ...lessonData } : lesson
      ));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update lesson'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteLesson = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete lesson');
      }
      setLessons(prev => prev.filter(lesson => lesson.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete lesson'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue = useMemo<LessonsContextType>(() => ({
    lessons,
    setLessons,
    isLoading,
    error,
    fetchLessons,
    addLesson,
    updateLesson,
    deleteLesson,
    getStudentLessons: (studentId: string) => {
      return lessons.filter(lesson => lesson.studentName === studentId);
    },
  }), [lessons, isLoading, error]);

  return (
    <LessonsContext.Provider value={contextValue}>
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

export default LessonsProvider;
