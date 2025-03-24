import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
  useEffect,
  ReactNode
} from 'react';

export interface Lesson {
  endTime: any;
  startTime: ReactNode;
  studentName: ReactNode;
  id: string;
  title: string;
  date: Date;
  duration: number;
  objectives: string[];
  studentProgress: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export type LessonsContextType = {
  lessons: Lesson[];
  loading: boolean;
  error: string | null;
  addLesson: (lesson: Omit<Lesson, 'id'>) => Promise<void>;
  updateLesson: (id: string, updates: Partial<Lesson>) => void;
  deleteLesson: (id: string) => void;
};

// Add validation functions
const validateLesson = (lesson: any): lesson is Lesson => {
  return (
    typeof lesson === 'object' &&
    typeof lesson.id === 'string' &&
    typeof lesson.title === 'string' &&
    lesson.date instanceof Date &&
    typeof lesson.duration === 'number' &&
    Array.isArray(lesson.objectives) &&
    lesson.objectives.every((objective: any) => typeof objective === 'string') &&
    typeof lesson.studentProgress === 'string' &&
    ['scheduled', 'completed', 'cancelled'].includes(lesson.status)
  );
};

const validateLessonsContext = (context: any): context is LessonsContextType => {
  return (
    typeof context === 'object' &&
    Array.isArray(context.lessons) &&
    context.lessons.every(validateLesson) &&
    typeof context.loading === 'boolean' &&
    (context.error === null || typeof context.error === 'string') &&
    typeof context.addLesson === 'function' &&
    typeof context.updateLesson === 'function' &&
    typeof context.deleteLesson === 'function'
  );
};

const LessonsContext = createContext<LessonsContextType | undefined>(undefined);

export const LessonsProvider = ({ children }: { children: ReactNode }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch('/api/lessons');
        const data = await response.json();
        
        // Transform date strings to Date objects
        const processedData = data.map((lesson: any) => ({
          ...lesson,
          date: new Date(lesson.date)
        }));
        
        // Validate and set lessons
        if (Array.isArray(processedData) && processedData.every(validateLesson)) {
          setLessons(processedData);
        } else {
          setError('Invalid lesson data format');
        }
      } catch (err) {
        setError('Failed to load lessons');
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, []);

  const addLesson = useCallback(async (lesson: Omit<Lesson, 'id'>) => {
    setLoading(true);
    try {
      const response = await fetch('/api/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lesson)
      });
      
      if (!response.ok) throw new Error('Failed to save lesson');
      
      const newLesson = await response.json();
      
      // Transform date string to Date object
      const processedLesson = {
        ...newLesson,
        date: new Date(newLesson.date)
      };
      
      // Validate before updating state
      if (validateLesson(processedLesson)) {
        setLessons(prev => [...prev, processedLesson]);
      } else {
        throw new Error('Invalid lesson data received');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save lesson');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLesson = useCallback((id: string, updates: Partial<Lesson>) => {
    setLessons(prev => prev.map(lesson => 
      lesson.id === id ? { ...lesson, ...updates } : lesson
    ));
  }, []);

  const deleteLesson = useCallback((id: string) => {
    setLessons(prev => prev.filter(lesson => lesson.id !== id));
  }, []);

  const contextValue = useMemo(() => {
    const value: LessonsContextType = {
      lessons,
      loading,
      error,
      addLesson,
      updateLesson,
      deleteLesson
    };
    
    // Validate context value
    if (!validateLessonsContext(value)) {
      throw new Error('Invalid context value');
    }
    
    return value;
  }, [lessons, loading, error, addLesson, updateLesson, deleteLesson]);

  return React.createElement(LessonsContext.Provider, { value: contextValue }, children);
};

export const useLessons = (): LessonsContextType => {
  const context = useContext(LessonsContext);
  if (!context) {
    throw new Error('useLessons must be used within a LessonsProvider');
  }
  
  // Validate context before returning
  if (!validateLessonsContext(context)) {
    throw new Error('Invalid context value');
  }
  
  return context;
};
