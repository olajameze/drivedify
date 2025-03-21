import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { SearchIcon, PlusIcon } from '@heroicons/react/outline';
import Link from 'next/link';

// Layout components
import { useRouter } from 'next/router';

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
}

const StudentsPage: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  
  // This would normally be fetched from an API
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '07712 345678',
      progress: 85,
      lastLesson: '2023-05-15',
      nextLesson: '2023-05-22',
      status: 'test-ready',
      notes: 'Ready for test. Needs more practice on parallel parking.'
    },
    {
      id: '2',
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      phone: '07823 456789',
      progress: 62,
      lastLesson: '2023-05-16',
      nextLesson: '2023-05-23',
      status: 'active',
      notes: 'Improving quickly. Focus on roundabouts next lesson.'
    },
    {
      id: '3',
      name: 'Emily Wilson',
      email: 'emily.w@example.com',
      phone: '07934 567890',
      progress: 91,
      lastLesson: '2023-05-14',
      nextLesson: '2023-05-21',
      status: 'test-ready',
      notes: 'Excellent progress. Mock test booked for next week.'
    },
    {
      id: '4',
      name: 'David Lee',
      email: 'david.l@example.com',
      phone: '07845 678901',
      progress: 45,
      lastLesson: '2023-05-13',
      nextLesson: '2023-05-20',
      status: 'active',
      notes: 'Needs work on mirror checks and signaling.'
    },
    {
      id: '5',
      name: 'Jessica Smith',
      email: 'jessica.s@example.com',
      phone: '07956 789012',
      progress: 30,
      lastLesson: '2023-05-12',
      nextLesson: '2023-05-19',
      status: 'active',
      notes: 'New student. Working on basic control skills.'
    },
    {
      id: '6',
      name: 'Robert Taylor',
      email: 'robert.t@example.com',
      phone: '07767 890123',
      progress: 15,
      lastLesson: '2023-05-10',
      nextLesson: '2023-05-17',
      status: 'inactive',
      notes: 'Postponed lessons due to work commitments.'
    }
  ]);

  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.phone.includes(searchTerm)
  );

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
        <title>Students | DrivEdify</title>
        <meta name="description" content="Manage your driving students, track progress, and schedule lessons." />
      </Head>

      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* Page header */}
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Students</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and track your students' progress
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              href="/students/new"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add New Student
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between gap-4">
            <div className="relative mt-1 flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search students..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Students table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50 border-t border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Name</div>
                  </th>
                  <th className="px-4 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Contact</div>
                  </th>
                  <th className="px-4 py-3 whitespace-nowrap">
                    <div className="font-semibold text-center">Progress</div>
                  </th>
                  <th className="px-4 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Last Lesson</div>
                  </th>
                  <th className="px-4 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Next Lesson</div>
                  </th>
                  <th className="px-4 py-3 whitespace-nowrap">
                    <div className="font-semibold text-center">Status</div>
                  </th>
                  <th className="px-4 py-3 whitespace-nowrap">
                    <div className="font-semibold text-center">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <motion.tr 
                    key={student.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 uppercase font-bold">
                          {student.name.split(' ').map(name => name[0]).join('')}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium text-gray-800">{student.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-left">
                        <div className="text-gray-800">{student.email}</div>
                        <div className="text-gray-500">{student.phone}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              student.progress < 30 ? 'bg-red-500' : 
                              student.progress < 70 ? 'bg-yellow-500' : 'bg-green-500'
                            }`} 
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-600 mt-1">{student.progress}%</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-left font-medium text-gray-800">
                        {new Date(student.lastLesson).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-left font-medium text-gray-800">
                        {new Date(student.nextLesson).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                          {student.status.replace('-', ' ')}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-center space-x-2">
                        <button
                          onClick={() => router.push(`/students/${student.id}`)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </button>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={() => router.push(`/students/${student.id}/edit`)}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                
                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      No students found. Try adjusting your search or add a new student.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentsPage; 