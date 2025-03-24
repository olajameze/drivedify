import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useLessons } from '../../contexts/LessonsContext';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { LessonsProvider } from '../../contexts/LessonsContext';

interface Lesson {
  id: string;
  title: string;
  date: string; // ISO format
  time: string; // HH:MM format
  start: Date;
  end: Date;
  duration: number;
  location: string;
  type: string;
  status: 'scheduled' | 'completed' | 'canceled';
  notes?: string;
  color?: string;
  objectives: string[];
  studentProgress: string;
  studentId: string;
  studentName: string;
}

const NewLessonPage = () => {
  const router = useRouter();
  const { addLesson } = useLessons();
  const [formData, setFormData] = useState({
    title: '',
    studentId: '',
    studentName: '',
    date: '',
    startTime: '',
    duration: 1,
    location: '',
    type: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Basic validation
      if (!formData.studentId || !formData.date || !formData.startTime || !formData.location) {
        throw new Error('Please fill in all required fields.');
      }
      
      // Create date objects from form data
      const date = new Date(formData.date);
      const [hours, minutes] = formData.startTime.split(':').map(n => parseInt(n, 10));
      
      date.setHours(hours, minutes, 0, 0);
      
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setMinutes(endDate.getMinutes() + formData.duration * 60);
      
      // Create lesson object with all required properties
      const newLesson: Omit<Lesson, 'id' | 'color'> = {
        title: formData.title,
        date: startDate.toISOString().split('T')[0],
        time: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
        start: startDate,
        end: endDate,
        duration: formData.duration,
        location: formData.location,
        type: formData.type,
        status: 'scheduled' as const,
        notes: formData.notes,
        objectives: [], // Empty array for now
        studentProgress: '', // Empty string for now
        studentId: formData.studentId,
        studentName: formData.studentName
      };
      
      // Add lesson
      await addLesson(newLesson);
      
      // Redirect to calendar
      router.push('/calendar');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create lesson');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">New Lesson</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields go here */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Lesson'}
          </button>
        </form>
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

const NewLessonPageWithProvider = () => (
  <LessonsProvider>
    <NewLessonPage />
  </LessonsProvider>
);

export default NewLessonPageWithProvider;
