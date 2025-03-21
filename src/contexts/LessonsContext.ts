import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useMemo,
  useCallback
} from 'react';

interface Lesson {
  id: string;
  title: string;
  date: Date;
  duration: number;
  objectives: string[];
  studentProgress: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface LessonsContextValue {
  lessons: Lesson[];
  addLesson: (lesson: Omit<Lesson, 'id'>) => void;
  updateLesson: (id: string, updates: Partial<Lesson>) => void;
  deleteLesson: (id: string) => void;
}

const LessonsContext = createContext<LessonsContextValue | undefined>(undefined);

export const LessonsProvider = ({ children }: { children: ReactNode }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);

  // Memoized validation function
  const validateLessonField = useCallback((key: string, value: unknown): boolean => {
    switch (key) {
      case 'title':
        return typeof value === 'string' && value.length > 0 && value.length <= 100;
      case 'date':
        return value instanceof Date && !isNaN(value.getTime());
      case 'duration':
        return typeof value === 'number' && value > 0;
      case 'objectives':
        return Array.isArray(value) && value.every(obj => typeof obj === 'string');
      case 'studentProgress':
        return typeof value === 'string' && value.length <= 500;
      case 'status':
        return ['scheduled', 'completed', 'cancelled'].includes(value as string);
      default:
        return false;
    }
  }, []);

  // Memoized addLesson with stable reference
  const addLesson = useCallback((lesson: Omit<Lesson, 'id'>) => {
    const newLesson: Lesson = {
      ...lesson,
      id: Math.random().toString(36).substring(2, 11), // Safer ID generation
    };
    setLessons(prev => [...prev, newLesson]);
  }, []);

  // Memoized updateLesson with stable reference
  const updateLesson = useCallback((id: string, updates: Partial<Lesson>) => {
    setLessons(prev =>
      prev.map(lesson => {
        if (lesson.id === id) {
          const validatedUpdates = Object.entries(updates).reduce<Partial<Lesson>>(
            (acc, [key, value]) => {
              if (validateLessonField(key, value)) {
                acc[key as keyof Lesson] = value as never;
              }
              return acc;
            },
            {}
          );
          return { ...lesson, ...validatedUpdates };
        }
        return lesson;
      })
    );
  }, [validateLessonField]);

  // Memoized deleteLesson with stable reference
  const deleteLesson = useCallback((id: string) => {
    setLessons(prev => prev.filter(lesson => lesson.id !== id));
  }, []);

  // Memoized context value
  const contextValue = useMemo(() => ({
    lessons,
    addLesson,
    updateLesson,
    deleteLesson,
  }), [lessons, addLesson, updateLesson, deleteLesson]);

  return (
    <LessonsContext.Provider value={contextValue}>
      {children}
    </LessonsContext.Provider>
  );
};

export const useLessons = (): LessonsContextValue => {
  const context = useContext(LessonsContext);
  if (!context) {
    throw new Error('useLessons must be used within a LessonsProvider');
  }
  return context;
};