import { Lesson, LessonsContextType } from '../contexts/LessonsContext';

export const validateLesson = (lesson: Partial<Lesson>): lesson is Lesson => {
  return (
    typeof lesson.id === 'string' &&
    typeof lesson.title === 'string' &&
    lesson.date instanceof Date &&
    typeof lesson.duration === 'number' &&
    Array.isArray(lesson.objectives) &&
    typeof lesson.studentProgress === 'string' &&
    typeof lesson.status === 'string' &&
    ['scheduled', 'completed', 'cancelled'].includes(lesson.status)
  );
};

export const validateLessonsContext = (context: Partial<LessonsContextType>): context is LessonsContextType => {
  return (
    Array.isArray(context.lessons) &&
    context.lessons.every(validateLesson) &&
    typeof context.loading === 'boolean' &&
    (context.error === null || typeof context.error === 'string') &&
    typeof context.addLesson === 'function' &&
    typeof context.updateLesson === 'function' &&
    typeof context.deleteLesson === 'function'
  );
};
