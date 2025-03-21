import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { 
  ArrowLeftIcon,
  SaveIcon,
  UserGroupIcon
} from '@heroicons/react/outline';
import Link from 'next/link';

interface StudentFormData {
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'test-ready';
  notes: string;
  address?: string;
  dob?: string;
  licenseNumber?: string;
  emergencyContact?: string;
}

const NewStudent: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('personal');
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<StudentFormData>({
    name: '',
    email: '',
    phone: '',
    status: 'active',
    notes: ''
  });

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
    
    // This would normally be an API call to create the student
    setTimeout(() => {
      setSaving(false);
      // Redirect to the student list page after successful creation
      router.push('/students');
    }, 1000);
  };

  return (
    <>
      <Head>
        <title>Add New Student | DrivEdify</title>
        <meta name="description" content="Add a new student to your DrivEdify account" />
      </Head>

      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* Back button */}
        <div className="mb-8 flex items-center">
          <Link href="/students" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            <span>Back to Students</span>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="mr-4 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <UserGroupIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Add New Student</h1>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Enter the student's details to create a new profile.
            </p>
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
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Smith"
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
                        placeholder="SMITH123456AB7CD"
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
                        value={formData.status}
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
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="07123 456789"
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
                        placeholder="123 Main Street, London, SW1 1AA"
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
                        placeholder="Jane Smith (Partner) - 07987 654321"
                      />
                      <p className="mt-1 text-xs text-gray-500">Format: Name (Relationship) - Phone Number</p>
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
                      Add any important information about the student that you want to remember.
                    </p>
                    <textarea
                      name="notes"
                      id="notes"
                      rows={8}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="E.g., Previous driving experience, learning preferences, or any other relevant notes."
                    />
                  </div>
                </motion.div>
              )}
            </div>
            
            <div className="px-6 py-3 bg-gray-50 flex justify-between sm:px-6 border-t border-gray-200">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => router.push('/students')}
              >
                Cancel
              </button>
              
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
                    Creating...
                  </>
                ) : (
                  <>
                    <SaveIcon className="h-4 w-4 mr-2" />
                    Create Student
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

export default NewStudent; 