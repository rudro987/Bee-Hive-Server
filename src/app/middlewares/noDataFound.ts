import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

const noDataFound = (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.data && Array.isArray(res.locals.data) && res.locals.data.length === 0) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: [],
    });
  }

  next();
};

export default noDataFound;