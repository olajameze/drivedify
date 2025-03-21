import axios from 'axios';

const API_BASE_URL = 'https://api.youractualurl.com'; // Updated to actual API endpoint

export const fetchUpcomingLessons = async () => {
  const response = await axios.get(`${API_BASE_URL}/upcoming-lessons`);
  return response.data;
};

export const fetchStudentProgress = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/student-progress`);
    return response.data;
  } catch (error) {
    console.error('Error fetching student progress:', error);
    throw new Error('Failed to fetch student progress data.');
  }
};

export const fetchEarnings = async () => {
  const response = await axios.get(`${API_BASE_URL}/earnings`);
  return response.data;
};

export const fetchNotifications = async () => {
  const response = await axios.get(`${API_BASE_URL}/notifications`);
  return response.data;
};
