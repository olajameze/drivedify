import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Lesson {
  id: string;
  title: string;
  studentId: string;
  studentName: string;
  date: string; // This is a string in ISO format
  time: string; // This is a string in HH:MM format
  start: Date;
  end: Date;
  duration: number;
  location: string;
  type: string;
  status: 'scheduled' | 'completed' | 'canceled';
  notes?: string;
  color?: string;
}

// Create a type for the lesson data when adding a new lesson
export type NewLessonInput = Omit<Lesson, 'id' | 'color'>;

interface LessonsContextType {
  lessons: Lesson[];
  isLoading: boolean;
  error: Error | null;
  fetchLessons: () => Promise<void>;
  addLesson: (lesson: NewLessonInput) => Promise<Lesson>;
  updateLesson: (id: string, lessonData: Partial<Lesson>) => Promise<Lesson>;
  deleteLesson: (id: string) => Promise<void>;
  getStudentLessons: (studentId: string) => Lesson[];
}

// Create the context
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
      
      // Process the data to ensure dates are properly formatted
      const processedData = data.map((lesson: any) => {
        const startDate = new Date(lesson.start);
        const endDate = new Date(lesson.end);
        
        return {
          ...lesson,
          start: startDate,
          end: endDate,
          // Add date and time properties if they don't exist
          date: lesson.date || startDate.toISOString().split('T')[0],
          time: lesson.time || startDate.toTimeString().slice(0, 5)
        };
      });
      
      setLessons(processedData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const addLesson = async (lesson: NewLessonInput): Promise<Lesson> => {
    // Ensure start and end are Date objects
    const startDate = lesson.start instanceof Date ? lesson.start : new Date(lesson.start);
    const endDate = lesson.end instanceof Date ? lesson.end : new Date(lesson.end);
    
    const newLesson: Lesson = { 
      ...lesson,
      id: Math.random().toString(36).substring(2, 9),
      start: startDate,
      end: endDate,
      color: getLessonColor(lesson.type)
    };
    
    setLessons(prev => [...prev, newLesson]);
    return newLesson;
  };

  const updateLesson = async (id: string, lessonData: Partial<Lesson>): Promise<Lesson> => {
    // Process date objects if they exist in the update
    const processedData = { ...lessonData };
    
    if (lessonData.start && !(lessonData.start instanceof Date)) {
      processedData.start = new Date(lessonData.start);
    }
    
    if (lessonData.end && !(lessonData.end instanceof Date)) {
      processedData.end = new Date(lessonData.end);
    }
    
    // If start date is updated, update date and time properties too
    if (processedData.start) {
      processedData.date = processedData.start.toISOString().split('T')[0];
      processedData.time = processedData.start.toTimeString().slice(0, 5);
    }
    
    setLessons(prev => prev.map(l => {
      if (l.id === id) {
        const updatedColor = lessonData.type ? getLessonColor(lessonData.type) : l.color;
        return { ...l, ...processedData, color: updatedColor };
      }
      return l;
    }));
    
    // Find the updated lesson to return
    const updatedLesson = lessons.find(l => l.id === id);
    if (!updatedLesson) {
      throw new Error(`Lesson with id ${id} not found`);
    }
    
    return { ...updatedLesson, ...processedData } as Lesson;
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
