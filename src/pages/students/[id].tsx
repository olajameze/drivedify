import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { 
  ArrowLeftIcon,
  CalendarIcon,
  PencilIcon,
  ChartBarIcon,
  CheckIcon,
  ExclamationIcon,
  DocumentTextIcon
} from '@heroicons/react/outline';
import Link from 'next/link';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  progress: number;
  lastLesson: string;
  nextLesson: string;
  status: 'active' | 'inactive' | 'test-ready';
  notes: string;
  address?: string;
  dob?: string;
  licenseNumber?: string;
  emergencyContact?: string;
  lessonHistory?: Lesson[];
  testReadiness?: {
    maneuvers: number;
    roadPositioning: number;
    mirrorUse: number;
    decisionMaking: number;
    junctionUse: number;
    overallConfidence: number;
  };
}

interface Lesson {
  id: string;
  date: string;
  duration: number;
  topics: string[];
  notes: string;
}

const StudentDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // This would normally be an API call
    if (id) {
      // Simulate API call
      setTimeout(() => {
        setStudent({
          id: id as string,
          name: 'Sarah Johnson',
          email: 'sarah.j@example.com',
          phone: '07712 345678',
          progress: 85,
          lastLesson: '2023-05-15',
          nextLesson: '2023-05-22',
          status: 'test-ready',
          notes: 'Ready for test. Needs more practice on parallel parking.',
          address: '123 Main Street, London, SW1 1AA',
          dob: '1995-06-12',
          licenseNumber: 'JOHNS956121SA9JP',
          emergencyContact: 'David Johnson (Father) - 07899 123456',
          lessonHistory: [
            {
              id: '1',
              date: '2023-05-15',
              duration: 2,
              topics: ['Parallel Parking', 'Emergency Stop'],
              notes: 'Good progress on parallel parking. Emergency stop needs more practice.'
            },
            {
              id: '2',
              date: '2023-05-08',
              duration: 2,
              topics: ['Roundabouts', 'Lane Changes'],
              notes: 'Excellent understanding of roundabout priorities. Lane changes smooth.'
            },
            {
              id: '3',
              date: '2023-05-01',
              duration: 1.5,
              topics: ['Reversing', 'Parking'],
              notes: 'Struggled with bay parking initially but improved by end of lesson.'
            }
          ],
          testReadiness: {
            maneuvers: 80,
            roadPositioning: 90,
            mirrorUse: 85,
            decisionMaking: 75,
            junctionUse: 95,
            overallConfidence: 85
          }
        });
        setLoading(false);
      }, 500);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-800">Student not found</h1>
          <Link href="/students" className="mt-4 inline-block text-blue-500 hover:underline">
            Back to Students
          </Link>
        </div>
      </div>
    );
  }

  // Format date to a more readable format
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Get status badge color
  const getStatusColor = (status: Student['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'test-ready': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Head>
        <title>{student.name} | DrivEdify</title>
        <meta name="description" content={`Student profile for ${student.name}`} />
      </Head>

      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* Back button and actions */}
        <div className="mb-8 flex justify-between items-center">
          <Link href="/students" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            <span>Back to Students</span>
          </Link>
          
          <div className="flex space-x-3">
            <Link
              href={`/students/${id}/edit`}
              className="btn bg-yellow-500 hover:bg-yellow-600 text-white flex items-center py-2 px-4 rounded-lg"
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              <span>Edit Student</span>
            </Link>
            <button 
              className="btn bg-blue-600 hover:bg-blue-700 text-white flex items-center py-2 px-4 rounded-lg"
              onClick={() => router.push(`/lessons/new?student=${id}`)}
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              <span>Schedule Lesson</span>
            </button>
          </div>
        </div>

        {/* Student header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 flex justify-center">
              <div className="h-24 w-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold">
                {student.name.split(' ').map(name => name[0]).join('')}
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
                  <div className="mt-1 flex flex-wrap gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                      {student.status.replace('-', ' ')}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Progress: {student.progress}%
                    </span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 text-sm text-gray-500">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    <span>Next Lesson: {formatDate(student.nextLesson)}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Email Address</p>
                  <p className="font-medium">{student.email}</p>
                </div>
                <div>
                  <p className="text-gray-500">Phone Number</p>
                  <p className="font-medium">{student.phone}</p>
                </div>
                <div>
                  <p className="text-gray-500">License Number</p>
                  <p className="font-medium">{student.licenseNumber}</p>
                </div>
                <div>
                  <p className="text-gray-500">Date of Birth</p>
                  <p className="font-medium">{formatDate(student.dob || '')}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex overflow-x-auto">
              <button 
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'lessons' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('lessons')}
              >
                Lesson History
              </button>
              <button 
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'progress' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('progress')}
              >
                Progress Assessment
              </button>
              <button 
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'notes' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('notes')}
              >
                Notes
              </button>
            </div>
          </div>
        </div>

        {/* Tab content */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Student Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm mb-1"><span className="font-medium">Address:</span> {student.address}</p>
                      <p className="text-sm mb-1"><span className="font-medium">Email:</span> {student.email}</p>
                      <p className="text-sm mb-1"><span className="font-medium">Phone:</span> {student.phone}</p>
                      <p className="text-sm"><span className="font-medium">Emergency Contact:</span> {student.emergencyContact}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Lesson Summary</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm mb-1"><span className="font-medium">Last Lesson:</span> {formatDate(student.lastLesson)}</p>
                      <p className="text-sm mb-1"><span className="font-medium">Next Lesson:</span> {formatDate(student.nextLesson)}</p>
                      <p className="text-sm mb-1"><span className="font-medium">Total Lessons:</span> {student.lessonHistory?.length || 0}</p>
                      <p className="text-sm"><span className="font-medium">Test Readiness:</span> {student.progress}%</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Lesson Feedback</h2>
                {student.lessonHistory && student.lessonHistory.length > 0 ? (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2">
                      {formatDate(student.lessonHistory[0].date)} ({student.lessonHistory[0].duration} hours)
                    </p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {student.lessonHistory[0].topics.map((topic, index) => (
                        <span key={index} className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {topic}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-700">{student.lessonHistory[0].notes}</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No lesson history available.</p>
                )}
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Test Readiness Assessment</h2>
                {student.testReadiness ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium text-gray-700">Maneuvers</h3>
                        <span className="text-sm font-medium text-gray-700">{student.testReadiness.maneuvers}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${
                            student.testReadiness.maneuvers < 50 ? 'bg-red-500' : 
                            student.testReadiness.maneuvers < 75 ? 'bg-yellow-500' : 'bg-green-500'
                          }`} 
                          style={{ width: `${student.testReadiness.maneuvers}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium text-gray-700">Road Positioning</h3>
                        <span className="text-sm font-medium text-gray-700">{student.testReadiness.roadPositioning}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${
                            student.testReadiness.roadPositioning < 50 ? 'bg-red-500' : 
                            student.testReadiness.roadPositioning < 75 ? 'bg-yellow-500' : 'bg-green-500'
                          }`} 
                          style={{ width: `${student.testReadiness.roadPositioning}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium text-gray-700">Mirror Use</h3>
                        <span className="text-sm font-medium text-gray-700">{student.testReadiness.mirrorUse}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${
                            student.testReadiness.mirrorUse < 50 ? 'bg-red-500' : 
                            student.testReadiness.mirrorUse < 75 ? 'bg-yellow-500' : 'bg-green-500'
                          }`} 
                          style={{ width: `${student.testReadiness.mirrorUse}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium text-gray-700">Decision Making</h3>
                        <span className="text-sm font-medium text-gray-700">{student.testReadiness.decisionMaking}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${
                            student.testReadiness.decisionMaking < 50 ? 'bg-red-500' : 
                            student.testReadiness.decisionMaking < 75 ? 'bg-yellow-500' : 'bg-green-500'
                          }`} 
                          style={{ width: `${student.testReadiness.decisionMaking}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium text-gray-700">Junction Use</h3>
                        <span className="text-sm font-medium text-gray-700">{student.testReadiness.junctionUse}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${
                            student.testReadiness.junctionUse < 50 ? 'bg-red-500' : 
                            student.testReadiness.junctionUse < 75 ? 'bg-yellow-500' : 'bg-green-500'
                          }`} 
                          style={{ width: `${student.testReadiness.junctionUse}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium text-gray-700">Overall Confidence</h3>
                        <span className="text-sm font-medium text-gray-700">{student.testReadiness.overallConfidence}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${
                            student.testReadiness.overallConfidence < 50 ? 'bg-red-500' : 
                            student.testReadiness.overallConfidence < 75 ? 'bg-yellow-500' : 'bg-green-500'
                          }`} 
                          style={{ width: `${student.testReadiness.overallConfidence}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No test readiness data available.</p>
                )}
              </div>
            </motion.div>
          )}
          
          {activeTab === 'lessons' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Lesson History</h2>
                <button 
                  className="btn bg-blue-600 hover:bg-blue-700 text-white flex items-center py-2 px-4 rounded-lg text-sm"
                  onClick={() => router.push(`/lessons/new?student=${id}`)}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span>Schedule New Lesson</span>
                </button>
              </div>
              
              {student.lessonHistory && student.lessonHistory.length > 0 ? (
                <div className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Duration
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Topics
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Notes
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {student.lessonHistory.map((lesson) => (
                          <tr key={lesson.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {formatDate(lesson.date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {lesson.duration} {lesson.duration > 1 ? 'hours' : 'hour'}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              <div className="flex flex-wrap gap-2">
                                {lesson.topics.map((topic, index) => (
                                  <span key={index} className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {topic}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 max-w-md">
                              {lesson.notes}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-8 text-center rounded-lg">
                  <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No lessons recorded yet</h3>
                  <p className="text-sm text-gray-500 mb-4">Start recording lessons to track progress over time.</p>
                  <button 
                    className="btn bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm inline-flex items-center"
                    onClick={() => router.push(`/lessons/new?student=${id}`)}
                  >
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    <span>Schedule First Lesson</span>
                  </button>
                </div>
              )}
            </motion.div>
          )}
          
          {activeTab === 'progress' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Progress Assessment</h2>
                <button 
                  className="btn bg-blue-600 hover:bg-blue-700 text-white flex items-center py-2 px-4 rounded-lg text-sm"
                  onClick={() => router.push(`/students/${id}/progress`)}
                >
                  <ChartBarIcon className="h-4 w-4 mr-2" />
                  <span>Update Assessment</span>
                </button>
              </div>
              
              {student.testReadiness ? (
                <>
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-medium text-gray-700">Overall Test Readiness</h3>
                      <div className="flex items-center">
                        <div className={`flex h-6 w-6 items-center justify-center rounded-full ${
                          student.progress < 75 ? 'bg-yellow-100' : 'bg-green-100'
                        }`}>
                          {student.progress < 75 ? (
                            <ExclamationIcon className="h-4 w-4 text-yellow-600" />
                          ) : (
                            <CheckIcon className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-700">{student.progress}%</span>
                      </div>
                    </div>
                    <div className="h-4 w-full bg-gray-200 rounded-full">
                      <div 
                        className={`h-4 rounded-full ${
                          student.progress < 50 ? 'bg-red-500' : 
                          student.progress < 75 ? 'bg-yellow-500' : 'bg-green-500'
                        }`} 
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-base font-medium text-gray-700 mb-4">Driving Skills</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">Maneuvers</span>
                            <span className="text-sm font-medium text-gray-700">{student.testReadiness.maneuvers}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div 
                              className={`h-2 rounded-full ${
                                student.testReadiness.maneuvers < 50 ? 'bg-red-500' : 
                                student.testReadiness.maneuvers < 75 ? 'bg-yellow-500' : 'bg-green-500'
                              }`} 
                              style={{ width: `${student.testReadiness.maneuvers}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">Road Positioning</span>
                            <span className="text-sm font-medium text-gray-700">{student.testReadiness.roadPositioning}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div 
                              className={`h-2 rounded-full ${
                                student.testReadiness.roadPositioning < 50 ? 'bg-red-500' : 
                                student.testReadiness.roadPositioning < 75 ? 'bg-yellow-500' : 'bg-green-500'
                              }`} 
                              style={{ width: `${student.testReadiness.roadPositioning}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">Mirror Use</span>
                            <span className="text-sm font-medium text-gray-700">{student.testReadiness.mirrorUse}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div 
                              className={`h-2 rounded-full ${
                                student.testReadiness.mirrorUse < 50 ? 'bg-red-500' : 
                                student.testReadiness.mirrorUse < 75 ? 'bg-yellow-500' : 'bg-green-500'
                              }`} 
                              style={{ width: `${student.testReadiness.mirrorUse}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-base font-medium text-gray-700 mb-4">Decision Making</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">Decision Making</span>
                            <span className="text-sm font-medium text-gray-700">{student.testReadiness.decisionMaking}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div 
                              className={`h-2 rounded-full ${
                                student.testReadiness.decisionMaking < 50 ? 'bg-red-500' : 
                                student.testReadiness.decisionMaking < 75 ? 'bg-yellow-500' : 'bg-green-500'
                              }`} 
                              style={{ width: `${student.testReadiness.decisionMaking}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">Junction Use</span>
                            <span className="text-sm font-medium text-gray-700">{student.testReadiness.junctionUse}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div 
                              className={`h-2 rounded-full ${
                                student.testReadiness.junctionUse < 50 ? 'bg-red-500' : 
                                student.testReadiness.junctionUse < 75 ? 'bg-yellow-500' : 'bg-green-500'
                              }`} 
                              style={{ width: `${student.testReadiness.junctionUse}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">Overall Confidence</span>
                            <span className="text-sm font-medium text-gray-700">{student.testReadiness.overallConfidence}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div 
                              className={`h-2 rounded-full ${
                                student.testReadiness.overallConfidence < 50 ? 'bg-red-500' : 
                                student.testReadiness.overallConfidence < 75 ? 'bg-yellow-500' : 'bg-green-500'
                              }`} 
                              style={{ width: `${student.testReadiness.overallConfidence}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-gray-50 p-8 text-center rounded-lg">
                  <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No assessment data</h3>
                  <p className="text-sm text-gray-500 mb-4">Complete a progress assessment to track readiness for the driving test.</p>
                  <button 
                    className="btn bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm inline-flex items-center"
                    onClick={() => router.push(`/students/${id}/progress`)}
                  >
                    <ChartBarIcon className="h-4 w-4 mr-2" />
                    <span>Complete Assessment</span>
                  </button>
                </div>
              )}
            </motion.div>
          )}
          
          {activeTab === 'notes' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Notes</h2>
                <button 
                  className="btn bg-blue-600 hover:bg-blue-700 text-white flex items-center py-2 px-4 rounded-lg text-sm"
                  onClick={() => router.push(`/students/${id}/edit?tab=notes`)}
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  <span>Edit Notes</span>
                </button>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                {student.notes ? (
                  <p className="text-sm text-gray-700 whitespace-pre-line">{student.notes}</p>
                ) : (
                  <p className="text-sm text-gray-500">No notes available for this student.</p>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentDetail; 