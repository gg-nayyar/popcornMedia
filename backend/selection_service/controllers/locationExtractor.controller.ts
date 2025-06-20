import jwt, { JwtPayload } from 'jsonwebtoken';
import SelectionSchema from '../models/selection.model';
import { Request, Response, NextFunction } from 'express';

interface LocationPayload extends JwtPayload {
  city: string;
  state: string;
}

export const locationExtractor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.cookies.location;

    if (!token) {
      res.status(400).json({ error: 'Location token missing' });
      return;
    }

    const decoded = jwt.verify(token, process.env.SECRET!) as JwtPayload;

    if (typeof decoded !== 'string' && 'city' in decoded && 'state' in decoded) {
      const location = decoded as LocationPayload;

      const response = await SelectionSchema.findOne({ "city": location.city });

      if (!response) {
        res.status(404).json({ error: 'Location not found' });
        return;
      }

      res.status(200).json(response);
    } else {
      res.status(400).json({ error: 'Invalid token payload structure' });
    }
  } catch (error) {
    console.error("JWT verification failed:", error);
    res.status(401).json({ error: 'Invalid location token' });
  }
};
