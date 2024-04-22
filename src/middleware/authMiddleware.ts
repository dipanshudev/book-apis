// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { validateJwtToken } from '@utils/jwtUtils';

interface RequestWithUser extends Request {
  user?: any,
}

export function requireAuth(req: RequestWithUser, res: Response, next: NextFunction): void {
  const token = req.header('Authorization');

  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized: No token provided' });
    return;
  }

  // Validate the token
  const decodedToken = validateJwtToken(token);

  if (!decodedToken) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized: Invalid token' });
    return;
  }

  // Attach the decoded token to the request for future use (e.g., user identification)
  req.user = decodedToken;

  // Proceed to the next middleware or route handler
  next();
}
