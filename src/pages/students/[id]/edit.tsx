import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { 
  ArrowLeftIcon,
  SaveIcon,
  TrashIcon
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
}

const EditStudent: React.FC = () => {
  const router = useRouter();
  const { id, tab } = router.query;
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [student, setStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState<Partial<Student>>({});

  useEffect(() => {
    if (tab && typeof tab === 'string') {
      setActiveTab(tab);
    }
  }, [tab]);

  useEffect(() => {
    // This would normally be an API call
    if (id) {
      // Simulate API call
      setTimeout(() => {
        const mockStudent: Student = {
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
        };
        
        setStudent(mockStudent);
        setFormData(mockStudent);
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

  if (!student || !formData) {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // This would normally be an API call to update the student
    setTimeout(() => {
      setSaving(false);
      router.push(`/students/${id}`);
    }, 1000);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
      // This would normally be an API call to delete the student
      router.push('/students');
    }
  };

  return (
    <>
      <Head>
        <title>Edit {student.name} | DrivEdify</title>
        <meta name="description" content={`Edit student profile for ${student.name}`} />
      </Head>

      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* Back button and actions */}
        <div className="mb-8 flex justify-between items-center">
          <Link href={`/students/${id}`} className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            <span>Back to Student Profile</span>
          </Link>
          
          <div className="flex space-x-3">
            <button 
              onClick={handleDelete}
              className="btn bg-red-500 hover:bg-red-600 text-white flex items-center py-2 px-4 rounded-lg"
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              <span>Delete Student</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Edit Student: {student.name}</h1>
          </div>
          
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <button 
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'personal' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('personal')}
              >
                Personal Information
              </button>
              <button 
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'contact' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('contact')}
              >
                Contact Details
              </button>
              <button 
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'notes' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('notes')}
              >
                Notes
              </button>
            </div>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="p-6">
              {activeTab === 'personal' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={formData.name || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dob"
                        id="dob"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={formData.dob || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
                        Driving License Number
                      </label>
                      <input
                        type="text"
                        name="licenseNumber"
                        id="licenseNumber"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={formData.licenseNumber || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Student Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={formData.status || ''}
                        onChange={handleInputChange}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="test-ready">Test Ready</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'contact' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={formData.email || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={formData.phone || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={formData.address || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700">
                        Emergency Contact
                      </label>
                      <input
                        type="text"
                        name="emergencyContact"
                        id="emergencyContact"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={formData.emergencyContact || ''}
                        onChange={handleInputChange}
                        placeholder="Name (Relationship) - Phone Number"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'notes' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                      Student Notes
                    </label>
                    <p className="text-sm text-gray-500 mb-2">
                      Add important information about the student that you want to remember.
                    </p>
                    <textarea
                      name="notes"
                      id="notes"
                      rows={8}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={formData.notes || ''}
                      onChange={handleInputChange}
                    />
                  </div>
                </motion.div>
              )}
            </div>
            
            <div className="px-6 py-3 bg-gray-50 text-right sm:px-6 border-t border-gray-200">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <SaveIcon className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditStudent; 