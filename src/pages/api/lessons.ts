import type { NextApiRequest, NextApiResponse } from 'next';
import { Lesson } from '../../contexts/LessonsContext';

let lessons: Lesson[] = [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET':
        res.status(200).json(lessons);
        break;
      case 'POST':
        const newLesson = {
          ...req.body,
          id: Date.now().toString(),
          date: new Date(req.body.date)
        };
        lessons.push(newLesson);
        res.status(201).json(newLesson);
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
