export interface Lesson {
  id: string;
  title: string;
  date: string; // Ensure this is included
  time: string; // Ensure this is included
  duration: number;
  studentId: string;
  student: string; // Ensure this is included if you have a separate student name
  status: string; // Add status if it's part of your logic
  location: string; // Add location if it's part of your logic
  type: string; // Add type if it's part of your logic
} 