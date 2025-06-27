import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../models/userSchema.model';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.cookies?.Authorization || req.headers?.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role: string };
    const user = await userModel.findById(decoded.id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (user.role !== 'admin' && user.role !== 'superadmin') {
      console.warn('Unauthorized access attempt by:', user.email);
      res.status(403).json({ message: 'Admin access only' });
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Error verifying token:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
};
