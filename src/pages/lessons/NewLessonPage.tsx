import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useLessons } from '../../contexts/LessonsContext';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Zod schema for validation
const lessonSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  studentId: z.string().min(1, { message: 'Student ID is required' }),
  studentName: z.string().min(1, { message: 'Student Name is required' }),
  date: z.date({ required_error: 'Date is required' }),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, { message: 'Invalid time format (HH:MM)' }),
  duration: z.number().min(1, { message: 'Duration must be at least 1 minute' }),
  location: z.string().min(1, { message: 'Location is required' }),
  type: z.string().min(1, { message: 'Lesson type is required' }),
  notes: z.string().optional(),
  objectives: z.string().array().min(1, { message: 'At least one objective is required' }),
  studentProgress: z.string().min(1, { message: 'Student progress is required' }),
});

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof lessonSchema>>({
    resolver: zodResolver(lessonSchema),
  });

  const onSubmit = async (data: z.infer<typeof lessonSchema>) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const date = new Date(data.date);
      const [hours, minutes] = data.startTime.split(':').map(Number);
      date.setHours(hours, minutes, 0, 0);

      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setMinutes(endDate.getMinutes() + data.duration * 60);

      const newLesson: Omit<Lesson, 'id'> = {
        title: data.title,
        date: startDate.toISOString().split('T')[0],
        time: data.startTime,
        start: startDate,
        end: endDate,
        duration: data.duration,
        location: data.location,
        type: data.type,
        status: 'scheduled',
        notes: data.notes,
        objectives: data.objectives.map(obj => obj.trim()), // Convert string to array
        studentProgress: data.studentProgress,
        studentId: data.studentId,
        studentName: data.studentName,
      };

      await addLesson(newLesson as any); // Casting to any to bypass the type mismatch
      router.push('/calendar');
    } catch (error: any) {
      setServerError(error.message || 'Failed to create lesson');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">New Lesson</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" {...register('title')} />
            {errors.title && <span role="alert">{errors.title.message}</span>}
          </div>
          <div>
            <label htmlFor="studentId">Student ID</label>
            <input type="text" id="studentId" {...register('studentId')} />
            {errors.studentId && <span role="alert">{errors.studentId.message}</span>}
          </div>
          <div>
            <label htmlFor="studentName">Student Name</label>
            <input type="text" id="studentName" {...register('studentName')} />
            {errors.studentName && <span role="alert">{errors.studentName.message}</span>}
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" {...register('date')} />
            {errors.date && <span role="alert">{errors.date.message}</span>}
          </div>
          <div>
            <label htmlFor="startTime">Start Time (HH:MM)</label>
            <input type="text" id="startTime" {...register('startTime')} />
            {errors.startTime && <span role="alert">{errors.startTime.message}</span>}
          </div>
          <div>
            <label htmlFor="duration">Duration (minutes)</label>
            <input type="number" id="duration" {...register('duration')} />
            {errors.duration && <span role="alert">{errors.duration.message}</span>}
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <input type="text" id="location" {...register('location')} />
            {errors.location && <span role="alert">{errors.location.message}</span>}
          </div>
          <div>
            <label htmlFor="type">Lesson Type</label>
            <input type="text" id="type" {...register('type')} />
            {errors.type && <span role="alert">{errors.type.message}</span>}
          </div>
          <div>
            <label htmlFor="notes">Notes</label>
            <textarea id="notes" {...register('notes')} />
          </div>
          <div>
            <label htmlFor="objectives">Objectives (comma-separated)</label>
            <textarea id="objectives" {...register('objectives')} />
            {errors.objectives && <span role="alert">{errors.objectives.message}</span>}
          </div>
          <div>
            <label htmlFor="studentProgress">Student Progress</label>
            <input type="text" id="studentProgress" {...register('studentProgress')} />
            {errors.studentProgress && <span role="alert">{errors.studentProgress.message}</span>}
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Lesson'}
          </button>
          {serverError && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
              {serverError}
            </div>
          )}
        </form>
      </div>
    </DashboardLayout>
  );
};

export default NewLessonPage;