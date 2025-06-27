import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export const isAdminMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.cookies?.Authorization || req.headers?.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    const response = await axios.get('http://localhost:8000/api/auth/is-admin', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: Admin access only' });
    }
  } catch (error: any) {
    console.error('Admin verification failed:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Failed to verify admin privileges',
    });
  }
};
