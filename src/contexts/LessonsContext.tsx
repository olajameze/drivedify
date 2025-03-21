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

  // Mock API functions
  const fetchLessons = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create base dates
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      const dayAfterTomorrow = new Date();
      dayAfterTomorrow.setDate(today.getDate() + 2);
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      
      // Mock data
      const mockLessons: Lesson[] = [
        {
          id: '1',
          title: 'Basic Control Lesson',
          studentId: '101',
          studentName: 'John Doe',
          start: new Date(today.setHours(10, 0, 0, 0)),
          end: new Date(today.setHours(11, 0, 0, 0)),
          duration: 1,
          location: 'North Campus',
          type: 'Basic Control',
          status: 'scheduled',
          notes: 'Focus on steering and vehicle control',
          color: getLessonColor('Basic Control'),
          date: today,
          time: '10:00 - 11:00'
        },
        {
          id: '2',
          title: 'Highway Driving',
          studentId: '102',
          studentName: 'Jane Smith',
          start: new Date(today.setHours(13, 0, 0, 0)),
          end: new Date(today.setHours(15, 0, 0, 0)),
          duration: 2,
          location: 'Highway 101',
          type: 'Highway Driving',
          status: 'scheduled',
          notes: 'Practice merging and lane changes',
          color: getLessonColor('Highway Driving'),
          time: '13:00 - 15:00',
          date: today
        },
        {
          id: '3',
          title: 'Parallel Parking Practice',
          studentId: '103',
          studentName: 'Mike Johnson',
          start: new Date(tomorrow.setHours(9, 0, 0, 0)),
          end: new Date(tomorrow.setHours(10, 30, 0, 0)),
          duration: 1.5,
          location: 'Downtown',
          type: 'Parallel Parking',
          status: 'scheduled',
          notes: 'Focus on parallel parking technique',
          color: getLessonColor('Parallel Parking'),
          time: '09:00 - 10:30',
          date: tomorrow
        },
        {
          id: '4',
          title: 'Mock Driving Test',
          studentId: '104',
          studentName: 'Sarah Wilson',
          start: new Date(dayAfterTomorrow.setHours(14, 0, 0, 0)),
          end: new Date(dayAfterTomorrow.setHours(16, 0, 0, 0)),
          duration: 2,
          location: 'Test Center Area',
          type: 'Mock Test',
          status: 'scheduled',
          notes: 'Full test simulation with evaluation',
          color: getLessonColor('Mock Test'),
          time: '14:00 - 16:00',
          date: dayAfterTomorrow
        },
        {
          id: '5',
          title: 'City Driving Lesson',
          studentId: '105',
          studentName: 'Alex Brown',
          start: new Date(yesterday.setHours(11, 0, 0, 0)),
          end: new Date(yesterday.setHours(13, 0, 0, 0)),
          duration: 2,
          location: 'City Center',
          type: 'City Driving',
          status: 'completed',
          notes: 'Traffic lights and pedestrian crossings',
          color: getLessonColor('City Driving'),
          time: '11:00 - 13:00',
          date: yesterday
        }
      ];
      setLessons((prevLessons: Lesson[]) => [...prevLessons, ...mockLessons]);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const addLesson = async (lessonData: Omit<Lesson, 'id'>): Promise<Lesson> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newLesson: Lesson = {
        ...lessonData,
        id: Math.random().toString(36).substring(2, 9), // Generate random ID
        color: getLessonColor(lessonData.type)
      };
      
      setLessons(prevLessons => [...prevLessons, newLesson]);
      return newLesson;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateLesson = async (id: string, lessonData: Partial<Lesson>): Promise<Lesson> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let updatedLesson: Lesson | undefined;
      
      setLessons(prevLessons => {
        const updatedLessons = prevLessons.map(lesson => {
          if (lesson.id === id) {
            updatedLesson = {
              ...lesson,
              ...lessonData,
              // Update color if type has changed
              color: lessonData.type ? getLessonColor(lessonData.type) : lesson.color
            };
            return updatedLesson;
          }
          return lesson;
        });
        
        return updatedLessons;
      });
      
      if (!updatedLesson) {
        throw new Error(`Lesson with ID ${id} not found`);
      }
      
      return updatedLesson;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteLesson = async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setLessons(prevLessons => {
        const lessonExists = prevLessons.some(lesson => lesson.id === id);
        
        if (!lessonExists) {
          throw new Error(`Lesson with ID ${id} not found`);
        }
        
        return prevLessons.filter(lesson => lesson.id !== id);
      });
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getStudentLessons = (studentId: string): Lesson[] => {
    return lessons.filter(lesson => lesson.studentId === studentId);
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