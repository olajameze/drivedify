import React, { useState } from 'react';
import { 
  CalendarIcon, 
  ClockIcon, 
  LocationMarkerIcon, 
  UserIcon,
  PencilIcon,
  TrashIcon,
  ExclamationIcon,
  CheckIcon,
  XIcon
} from '@heroicons/react/outline';
import { Lesson, useLessons } from '../../contexts/LessonsContext';
import Link from 'next/link';
import { format } from 'date-fns';

interface LessonModalProps {
  lesson: Lesson;
  isOpen: boolean;
  onClose: () => void;
}

const LessonModal: React.FC<LessonModalProps> = ({ lesson, isOpen, onClose }) => {
  const { updateLesson, deleteLesson } = useLessons();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editedLesson, setEditedLesson] = useState<Lesson>(lesson);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedLesson(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const [year, month, day] = value.split('-').map(n => parseInt(n, 10));
    
    const newDate = new Date(editedLesson.start);
    newDate.setFullYear(year, month - 1, day);
    
    const newEndDate = new Date(editedLesson.end);
    newEndDate.setFullYear(year, month - 1, day);
    
    setEditedLesson(prev => ({
      ...prev,
      start: newDate,
      end: newEndDate
    }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [hours, minutes] = value.split(':').map(n => parseInt(n, 10));
    
    if (name === 'startTime') {
      const newDate = new Date(editedLesson.start);
      newDate.setHours(hours, minutes);
      
      // Calculate new end time based on duration
      const newEndDate = new Date(newDate);
      newEndDate.setMinutes(newEndDate.getMinutes() + editedLesson.duration * 60);
      
      setEditedLesson(prev => ({
        ...prev,
        start: newDate,
        end: newEndDate
      }));
    }
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const duration = parseFloat(e.target.value);
    
    // Calculate new end time based on new duration
    const newEndDate = new Date(editedLesson.start);
    newEndDate.setMinutes(newEndDate.getMinutes() + duration * 60);
    
    setEditedLesson(prev => ({
      ...prev,
      duration,
      end: newEndDate
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      await updateLesson(lesson.id, editedLesson);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update lesson:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    setIsProcessing(true);
    
    try {
      await deleteLesson(lesson.id);
      onClose();
    } catch (error) {
      console.error('Failed to delete lesson:', error);
      setIsDeleting(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStatusChange = async (newStatus: Lesson['status']) => {
    setIsProcessing(true);
    
    try {
      await updateLesson(lesson.id, { status: newStatus });
      setEditedLesson(prev => ({
        ...prev,
        status: newStatus
      }));
    } catch (error) {
      console.error('Failed to update lesson status:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Get status badge color and text
  const getStatusDetails = (status: Lesson['status']) => {
    switch (status) {
      case 'scheduled':
        return { 
          color: 'bg-blue-100 text-blue-800', 
          icon: <CalendarIcon className="h-4 w-4 mr-1" />, 
          text: 'Scheduled' 
        };
      case 'completed':
        return { 
          color: 'bg-green-100 text-green-800', 
          icon: <CheckIcon className="h-4 w-4 mr-1" />, 
          text: 'Completed' 
        };
      case 'canceled':
        return { 
          color: 'bg-gray-100 text-gray-800', 
          icon: <XIcon className="h-4 w-4 mr-1" />, 
          text: 'Canceled' 
        };
      default:
        return { 
          color: 'bg-gray-100 text-gray-800', 
          icon: <ExclamationIcon className="h-4 w-4 mr-1" />, 
          text: 'Unknown' 
        };
    }
  };

  const statusDetails = getStatusDetails(editedLesson.status);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="lesson-modal" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Edit Lesson
                    </h3>
                    
                    <div className="mt-4 grid grid-cols-1 gap-y-4">
                      <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                          Lesson Type
                        </label>
                        <select
                          id="type"
                          name="type"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          value={editedLesson.type}
                          onChange={handleChange}
                        >
                          <option value="Basic Control">Basic Control</option>
                          <option value="City Driving">City Driving</option>
                          <option value="Highway Driving">Highway Driving</option>
                          <option value="Parallel Parking">Parallel Parking</option>
                          <option value="Maneuvers">Maneuvers</option>
                          <option value="Mock Test">Mock Test</option>
                          <option value="Test Preparation">Test Preparation</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                          Date
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          value={editedLesson.start ? new Date(editedLesson.start).toISOString().split('T')[0] : ''}
                          onChange={handleDateChange}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                            Start Time
                          </label>
                          <input
                            type="time"
                            id="startTime"
                            name="startTime"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            value={format(editedLesson.start, 'HH:mm')}
                            onChange={handleTimeChange}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                            Duration
                          </label>
                          <select
                            id="duration"
                            name="duration"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            value={editedLesson.duration}
                            onChange={handleDurationChange}
                          >
                            <option value="1">1 hour</option>
                            <option value="1.5">1.5 hours</option>
                            <option value="2">2 hours</option>
                            <option value="2.5">2.5 hours</option>
                            <option value="3">3 hours</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                          Location
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          value={editedLesson.location}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                          Status
                        </label>
                        <select
                          id="status"
                          name="status"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          value={editedLesson.status}
                          onChange={handleChange}
                        >
                          <option value="scheduled">Scheduled</option>
                          <option value="completed">Completed</option>
                          <option value="canceled">Canceled</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                          Notes
                        </label>
                        <textarea
                          id="notes"
                          name="notes"
                          rows={3}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          value={editedLesson.notes || ''}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setIsEditing(false)}
                    disabled={isProcessing}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : isDeleting ? (
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Delete Lesson
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this lesson? This action cannot be undone.
                    </p>
                  </div>
                  
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handleDelete}
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Deleting...' : 'Delete'}
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={() => setIsDeleting(false)}
                      disabled={isProcessing}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {editedLesson.title}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center ${statusDetails.color}`}>
                      {statusDetails.icon}
                      {statusDetails.text}
                    </span>
                  </div>
                  
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700">
                        <Link href={`/students/${editedLesson.studentId}`} className="text-blue-600 hover:text-blue-800">
                          {editedLesson.studentName}
                        </Link>
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700">
                        {format(editedLesson.start, 'EEEE, MMMM d, yyyy')}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700">
                        {format(editedLesson.start, 'h:mm a')} - {format(editedLesson.end, 'h:mm a')} ({editedLesson.duration} {editedLesson.duration === 1 ? 'hour' : 'hours'})
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <LocationMarkerIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700">
                        {editedLesson.location}
                      </span>
                    </div>
                    
                    {editedLesson.notes && (
                      <div className="pt-2">
                        <h4 className="text-sm font-medium text-gray-700">Notes:</h4>
                        <p className="mt-1 text-sm text-gray-700">
                          {editedLesson.notes}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {editedLesson.status === 'scheduled' && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        onClick={() => handleStatusChange('completed')}
                        disabled={isProcessing}
                      >
                        <CheckIcon className="h-4 w-4 mr-1" />
                        Mark as Completed
                      </button>
                      
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        onClick={() => handleStatusChange('canceled')}
                        disabled={isProcessing}
                      >
                        <XIcon className="h-4 w-4 mr-1" />
                        Cancel Lesson
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {!isEditing && !isDeleting && (
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setIsEditing(true)}
              >
                <PencilIcon className="h-4 w-4 mr-1" />
                Edit
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setIsDeleting(true)}
              >
                <TrashIcon className="h-4 w-4 mr-1" />
                Delete
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonModal; 