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

export const isSuperAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.cookies?.Authorization || req.headers?.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const response = await userModel.findById((decoded as any).id);
    if (!response) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    if ((response as any).role !== 'superadmin') {
      console.error('Unauthorized access attempt by:', response);
      res.status(403).json({ message: 'Superadmin access only' });
      return;
    }
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Error verifying token:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
};
