import React, { useEffect, useState } from 'react';
import { fetchStudentProgress } from '../utils/apiService';

const StudentProgress = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    const getStudentProgress = async () => {
    try {
      const data = await fetchStudentProgress();
      setStudents(data);
    } catch (err) {
      setError('Failed to fetch student progress data.');
    } finally {
      setLoading(false);
    }

      setStudents(data);
    };
    getStudentProgress(); // Corrected function call
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Student Progress</h2>
      {loading ? (
        <p>Loading student progress data...</p>
      ) : students.length === 0 ? (

        <p>No student progress data available.</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student.id} className="border-b py-2">
              <span>{student.name}: {student.progress} - {student.readiness}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentProgress;
