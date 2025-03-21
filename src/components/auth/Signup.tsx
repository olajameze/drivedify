import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Step = 'basic' | 'verification' | 'documents' | 'complete';

const Signup = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState('basic');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Basic info form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  // Verification form state
  const [adiNumber, setAdiNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  // Document upload state
  const [govId, setGovId] = useState<File | null>(null);
  const [proofOfAddress, setProofOfAddress] = useState<File | null>(null);
  
  const handleBasicSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setCurrentStep('verification');
  };
  
  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate ADI number format (for example: ABC123456)
    const adiRegex = /^[A-Z]{3}\d{6}$/;
    if (!adiRegex.test(adiNumber)) {
      setError('Please enter a valid ADI number in format ABC123456');
      return;
    }
    
    setError('');
    setCurrentStep('documents');
  };
  
  const handleDocumentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!govId || !proofOfAddress) {
      setError('Both documents are required');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Here you would handle the actual file upload and API call
      // This is a placeholder for demonstration
      console.log('Submitting signup with:', {
        email, password, name, phone, adiNumber, expiryDate,
        govId: govId.name,
        proofOfAddress: proofOfAddress.name
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCurrentStep('complete');
    } catch (err) {
      setError('An error occurred during signup. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div 
          className="flex justify-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* DrivEdify Text Logo */}
          <div className="relative">
            <h1 className="text-4xl font-extrabold text-blue-600">
              Driv<span className="text-gray-800">Edify</span>
            </h1>
          </div>
        </motion.div>
        
        <motion.h2 
          className="mt-6 text-center text-3xl font-extrabold text-gray-900"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {currentStep === 'complete' ? 'Registration Complete!' : 'Create your account'}
        </motion.h2>
        
        {currentStep !== 'complete' && (
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        )}
      </div>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div 
          className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {/* Progress Steps */}
          {currentStep !== 'complete' && (
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="w-full flex items-center">
                  <div className={`flex items-center justify-center h-8 w-8 rounded-full ${currentStep === 'basic' || currentStep === 'verification' || currentStep === 'documents' ? 'bg-blue-600 text-white' : 'border-2 border-gray-300 text-gray-500'}`}>1</div>
                  <div className={`h-1 flex-1 mx-2 ${currentStep === 'basic' || currentStep === 'verification' || currentStep === 'documents' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                  <div className={`flex items-center justify-center h-8 w-8 rounded-full ${currentStep === 'verification' || currentStep === 'documents' ? 'bg-blue-600 text-white' : 'border-2 border-gray-300 text-gray-500'}`}>2</div>
                  <div className={`h-1 flex-1 mx-2 ${currentStep === 'verification' || currentStep === 'documents' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                  <div className={`flex items-center justify-center h-8 w-8 rounded-full ${currentStep === 'documents' ? 'bg-blue-600 text-white' : 'border-2 border-gray-300 text-gray-500'}`}>3</div>
                </div>
              </div>
              <div className="flex justify-between mt-1 text-xs">
                <span className="text-blue-600">Account Info</span>
                <span className={currentStep === 'verification' || currentStep === 'documents' ? 'text-blue-600' : 'text-gray-500'}>Verification</span>
                <span className={currentStep === 'documents' ? 'text-blue-600' : 'text-gray-500'}>Documents</span>
              </div>
            </div>
          )}
          
          {error && (
            <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          
          {/* Basic Info Form */}
          {currentStep === 'basic' && (
            <form className="space-y-6" onSubmit={handleBasicSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="John Smith"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="07123456789"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Continue
                </button>
              </div>
            </form>
          )}
          
          {/* Verification Form */}
          {currentStep === 'verification' && (
            <form className="space-y-6" onSubmit={handleVerificationSubmit}>
              <div>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                  <p className="text-sm text-blue-700">
                    <strong>Note:</strong> As a driving instructor platform, we need to verify your instructor credentials.
                  </p>
                </div>
                
                <label htmlFor="adiNumber" className="block text-sm font-medium text-gray-700">
                  ADI Number
                </label>
                <div className="mt-1">
                  <input
                    id="adiNumber"
                    name="adiNumber"
                    type="text"
                    required
                    value={adiNumber}
                    onChange={(e) => setAdiNumber(e.target.value.toUpperCase())}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="ABC123456"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Your Approved Driving Instructor number (e.g., ABC123456)
                </p>
              </div>
              
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                  ADI Expiry Date
                </label>
                <div className="mt-1">
                  <input
                    id="expiryDate"
                    name="expiryDate"
                    type="date"
                    required
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep('basic')}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Continue
                </button>
              </div>
            </form>
          )}
          
          {/* Document Upload Form */}
          {currentStep === 'documents' && (
            <form className="space-y-6" onSubmit={handleDocumentSubmit}>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <p className="text-sm text-blue-700">
                  <strong>Important:</strong> Please upload the required documents for verification. All information is securely encrypted and only used for verification purposes.
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Government-issued ID
                </label>
                <div className="mt-1 flex items-center">
                  <label className={`cursor-pointer w-full px-3 py-2 border ${govId ? 'border-green-300 bg-green-50' : 'border-gray-300'} rounded-md shadow-sm text-sm ${govId ? 'text-green-700' : 'text-gray-400'}`}>
                    <span>{govId ? `Selected: ${govId.name}` : 'Select a file...'}</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*, application/pdf"
                      onChange={(e) => handleFileChange(e, setGovId)}
                    />
                  </label>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Upload your passport, driving license, or other government-issued ID (JPG, PNG, or PDF)
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Proof of Address
                </label>
                <div className="mt-1 flex items-center">
                  <label className={`cursor-pointer w-full px-3 py-2 border ${proofOfAddress ? 'border-green-300 bg-green-50' : 'border-gray-300'} rounded-md shadow-sm text-sm ${proofOfAddress ? 'text-green-700' : 'text-gray-400'}`}>
                    <span>{proofOfAddress ? `Selected: ${proofOfAddress.name}` : 'Select a file...'}</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*, application/pdf"
                      onChange={(e) => handleFileChange(e, setProofOfAddress)}
                    />
                  </label>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Upload a recent utility bill, bank statement, or council tax bill (JPG, PNG, or PDF)
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep('verification')}
                  disabled={loading}
                  className={`flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Submitting...' : 'Complete Registration'}
                </button>
              </div>
            </form>
          )}
          
          {/* Registration Complete */}
          {currentStep === 'complete' && (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center mb-5">
                <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Registration Submitted!</h3>
              <p className="mt-2 text-sm text-gray-500">
                Thank you for registering with DrivEdify. Your verification is now being processed. 
                This typically takes 1-2 business days.
              </p>
              <p className="mt-4 text-sm text-gray-500">
                We'll notify you by email at <span className="font-medium">{email}</span> once your account is verified.
              </p>
              
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Return to Home
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Signup; 