import type { NextApiRequest, NextApiResponse } from 'next';
import { DashboardStats } from '../../types/dashboard';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DashboardStats | { message: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Mock data for now - replace with actual database queries
    const dashboardData: DashboardStats = {
      totalStudents: 24,
      upcomingLessons: 8,
      monthlyEarnings: 2450,
      testPassRate: 85,
      completedLessons: 156
    };

    return res.status(200).json(dashboardData);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
}