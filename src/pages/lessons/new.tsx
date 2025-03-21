import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  CalendarIcon, 
  ClockIcon, 
  LocationMarkerIcon, 
  UserIcon 
} from '@heroicons/react/outline';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useLessons } from '../../contexts/LessonsContext';
import { LessonsProvider } from '../../contexts/LessonsContext';

interface FormData {
  title: string;
  studentId: string;
  studentName: string;
  date: string;
  startTime: string;
  duration: number;
  location: string;
  type: string;
  notes: string;
}

const NewLessonPage = () => {
  const router = useRouter();
  const { addLesson } = useLessons();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    studentId: '',
    studentName: '',
    date: '',
    startTime: '',
    duration: 1,
    location: '',
    type: 'Basic Control',
    notes: ''
  });

  // Mock student data - in a real app this would come from an API
  const students = [
    { id: '101', name: 'John Doe' },
    { id: '102', name: 'Jane Smith' },
    { id: '103', name: 'Mike Johnson' },
    { id: '104', name: 'Sarah Wilson' },
    { id: '105', name: 'Alex Brown' }
  ];

  const lessonTypes = [
    'Basic Control', 
    'City Driving', 
    'Highway Driving', 
    'Parallel Parking', 
    'Maneuvers', 
    'Mock Test',
    'Test Preparation'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'studentId') {
      const selectedStudent = students.find(s => s.id === value);
      setFormData(prev => ({
        ...prev,
        [name]: value,
        studentName: selectedStudent?.name || '',
        title: selectedStudent ? `${prev.type} with ${selectedStudent.name}` : prev.title
      }));
    } else if (name === 'type') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        title: prev.studentName ? `${value} with ${prev.studentName}` : prev.title
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Basic validation
      if (!formData.studentId || !formData.date || !formData.startTime) {
        throw new Error('Please fill in all required fields.');
      }
      
      // Create date objects from form data
      const date = new Date(formData.date);
      const [hours, minutes] = formData.startTime.split(':').map(n => parseInt(n, 10));
      
      date.setHours(hours, minutes, 0, 0);
      
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setMinutes(endDate.getMinutes() + formData.duration * 60);
      
      // Create lesson object
      const newLesson = {
        title: formData.title,
        studentId: formData.studentId,
        studentName: formData.studentName,
        start: startDate,
        end: endDate,
        duration: formData.duration,
        location: formData.location,
        type: formData.type,
        status: 'scheduled' as const,
        notes: formData.notes
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
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              New Lesson
            </h2>
            <Link
              href="/calendar"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-6">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              {error && (
                <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  {/* Student Selection */}
                  <div className="sm:col-span-3">
                    <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
                      Student *
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <select
                        id="studentId"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleChange}
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        required
                      >
                        <option value="">Select a student</option>
                        {students.map(student => (
                          <option key={student.id} value={student.id}>
                            {student.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Lesson Type */}
                  <div className="sm:col-span-3">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      Lesson Type *
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      required
                    >
                      {lessonTypes.map(type => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div className="sm:col-span-2">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                      Date *
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>

                  {/* Start Time */}
                  <div className="sm:col-span-2">
                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                      Start Time *
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ClockIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="time"
                        id="startTime"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="sm:col-span-2">
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                      Duration (hours) *
                    </label>
                    <select
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      required
                    >
                      <option value={1}>1 hour</option>
                      <option value={1.5}>1.5 hours</option>
                      <option value={2}>2 hours</option>
                      <option value={2.5}>2.5 hours</option>
                      <option value={3}>3 hours</option>
                    </select>
                  </div>

                  {/* Location */}
                  <div className="sm:col-span-6">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Location *
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LocationMarkerIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g., City Center, School Zone, etc."
                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="sm:col-span-6">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                      Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Any special instructions or notes about this lesson..."
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Link
                    href="/calendar"
                    className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Creating...' : 'Create Lesson'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
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