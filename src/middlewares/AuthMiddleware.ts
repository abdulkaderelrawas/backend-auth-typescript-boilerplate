import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel';
import asyncHandler from 'express-async-handler';

export const protect = asyncHandler(
  async (request: Request, response: Response, next: NextFunction) => {
    let token: string;

    console.log(request.headers.authorization);

    if (
      request.headers.authorization &&
      request.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = request.headers.authorization.split(' ')[1];
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
        const { userID } = decoded;
        request.body.user = await User.findById(userID).select('-password');

        next();
      } catch (error) {
        response.status(401);
        throw new Error('Not authorized, Token failed');
      }
    }
    if (!token) {
      response.status(401);
      throw new Error('Not authorized, Token missing');
    }
  }
);
