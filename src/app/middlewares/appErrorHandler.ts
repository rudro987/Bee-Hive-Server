import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';

const appErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message: err.message || 'Internal Server Error',
  });
};

export default appErrorHandler;