import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { 
  ArrowLeftIcon,
  SaveIcon,
  ChartBarIcon
} from '@heroicons/react/outline';
import Link from 'next/link';

interface Student {
  id: string;
  name: string;
  progress: number;
  testReadiness?: {
    maneuvers: number;
    roadPositioning: number;
    mirrorUse: number;
    decisionMaking: number;
    junctionUse: number;
    overallConfidence: number;
  };
}

interface AssessmentFormData {
  maneuvers: number;
  roadPositioning: number;
  mirrorUse: number;
  decisionMaking: number;
  junctionUse: number;
  overallConfidence: number;
}

const ProgressAssessment: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [student, setStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState<AssessmentFormData>({
    maneuvers: 0,
    roadPositioning: 0,
    mirrorUse: 0,
    decisionMaking: 0,
    junctionUse: 0,
    overallConfidence: 0,
  });

  useEffect(() => {
    // This would normally be an API call
    if (id) {
      // Simulate API call
      setTimeout(() => {
        const mockStudent: Student = {
          id: id as string,
          name: 'Sarah Johnson',
          progress: 85,
          testReadiness: {
            maneuvers: 80,
            roadPositioning: 90,
            mirrorUse: 85,
            decisionMaking: 75,
            junctionUse: 95,
            overallConfidence: 85
          }
        };
        
        setStudent(mockStudent);
        if (mockStudent.testReadiness) {
          setFormData(mockStudent.testReadiness);
        }
        setLoading(false);
      }, 500);
    }
  }, [id]);

  const calculateOverallProgress = (data: AssessmentFormData): number => {
    const sum = data.maneuvers + 
               data.roadPositioning + 
               data.mirrorUse + 
               data.decisionMaking + 
               data.junctionUse + 
               data.overallConfidence;
    
    return Math.round(sum / 6);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value, 10);
    
    if (numValue >= 0 && numValue <= 100) {
      setFormData(prev => {
        const updated = {
          ...prev,
          [name]: numValue
        };
        return updated;
      });
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value, 10);
    
    setFormData(prev => {
      const updated = {
        ...prev,
        [name]: numValue
      };
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Calculate overall progress
    const overallProgress = calculateOverallProgress(formData);
    
    // This would normally be an API call to update the student's progress
    setTimeout(() => {
      setSaving(false);
      router.push(`/students/${id}`);
    }, 1000);
  };

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

  // Get color based on score
  const getScoreColor = (score: number) => {
    if (score < 50) return 'bg-red-500';
    if (score < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Get text color based on score
  const getTextColor = (score: number) => {
    if (score < 50) return 'text-red-700';
    if (score < 75) return 'text-yellow-700';
    return 'text-green-700';
  };

  return (
    <>
      <Head>
        <title>Progress Assessment | {student.name} | DrivEdify</title>
        <meta name="description" content={`Assess driving test readiness for ${student.name}`} />
      </Head>

      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        {/* Back button */}
        <div className="mb-8 flex justify-between items-center">
          <Link href={`/students/${id}`} className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            <span>Back to Student Profile</span>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="mr-4 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <ChartBarIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Progress Assessment: {student.name}</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Evaluate the student's readiness for the driving test
                </p>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="p-6">
              <div className="space-y-8">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Overall Test Readiness</h2>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Current Assessment Result</span>
                      <span className={`text-sm font-bold ${getTextColor(calculateOverallProgress(formData))}`}>
                        {calculateOverallProgress(formData)}%
                      </span>
                    </div>
                    <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-4 ${getScoreColor(calculateOverallProgress(formData))}`} 
                        style={{ width: `${calculateOverallProgress(formData)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-base font-medium text-gray-900 mb-4">Driving Skills</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label htmlFor="maneuvers" className="block text-sm font-medium text-gray-700">
                            Maneuvers
                          </label>
                          <span className={`text-sm font-medium ${getTextColor(formData.maneuvers)}`}>
                            {formData.maneuvers}%
                          </span>
                        </div>
                        <input
                          type="range"
                          id="maneuvers"
                          name="maneuvers"
                          min="0"
                          max="100"
                          step="5"
                          value={formData.maneuvers}
                          onChange={handleSliderChange}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0%</span>
                          <span>50%</span>
                          <span>100%</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label htmlFor="roadPositioning" className="block text-sm font-medium text-gray-700">
                            Road Positioning
                          </label>
                          <span className={`text-sm font-medium ${getTextColor(formData.roadPositioning)}`}>
                            {formData.roadPositioning}%
                          </span>
                        </div>
                        <input
                          type="range"
                          id="roadPositioning"
                          name="roadPositioning"
                          min="0"
                          max="100"
                          step="5"
                          value={formData.roadPositioning}
                          onChange={handleSliderChange}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0%</span>
                          <span>50%</span>
                          <span>100%</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label htmlFor="mirrorUse" className="block text-sm font-medium text-gray-700">
                            Mirror Use
                          </label>
                          <span className={`text-sm font-medium ${getTextColor(formData.mirrorUse)}`}>
                            {formData.mirrorUse}%
                          </span>
                        </div>
                        <input
                          type="range"
                          id="mirrorUse"
                          name="mirrorUse"
                          min="0"
                          max="100"
                          step="5"
                          value={formData.mirrorUse}
                          onChange={handleSliderChange}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0%</span>
                          <span>50%</span>
                          <span>100%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium text-gray-900 mb-4">Decision Making</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label htmlFor="decisionMaking" className="block text-sm font-medium text-gray-700">
                            Decision Making
                          </label>
                          <span className={`text-sm font-medium ${getTextColor(formData.decisionMaking)}`}>
                            {formData.decisionMaking}%
                          </span>
                        </div>
                        <input
                          type="range"
                          id="decisionMaking"
                          name="decisionMaking"
                          min="0"
                          max="100"
                          step="5"
                          value={formData.decisionMaking}
                          onChange={handleSliderChange}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0%</span>
                          <span>50%</span>
                          <span>100%</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label htmlFor="junctionUse" className="block text-sm font-medium text-gray-700">
                            Junction Use
                          </label>
                          <span className={`text-sm font-medium ${getTextColor(formData.junctionUse)}`}>
                            {formData.junctionUse}%
                          </span>
                        </div>
                        <input
                          type="range"
                          id="junctionUse"
                          name="junctionUse"
                          min="0"
                          max="100"
                          step="5"
                          value={formData.junctionUse}
                          onChange={handleSliderChange}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0%</span>
                          <span>50%</span>
                          <span>100%</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label htmlFor="overallConfidence" className="block text-sm font-medium text-gray-700">
                            Overall Confidence
                          </label>
                          <span className={`text-sm font-medium ${getTextColor(formData.overallConfidence)}`}>
                            {formData.overallConfidence}%
                          </span>
                        </div>
                        <input
                          type="range"
                          id="overallConfidence"
                          name="overallConfidence"
                          min="0"
                          max="100"
                          step="5"
                          value={formData.overallConfidence}
                          onChange={handleSliderChange}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0%</span>
                          <span>50%</span>
                          <span>100%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-2">Assessment Notes</h3>
                  <textarea
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Add notes about the student's performance and areas for improvement..."
                  ></textarea>
                </div>
              </div>
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
                    Saving Assessment...
                  </>
                ) : (
                  <>
                    <SaveIcon className="h-4 w-4 mr-2" />
                    Save Assessment
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

export default ProgressAssessment; 