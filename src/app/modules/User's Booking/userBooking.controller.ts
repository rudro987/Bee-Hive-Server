import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { UserBookingServices } from './userBooking.service';

const getUserBookings = catchAsync(async (req, res) => {
  const userFromToken = req.user; 

  const result = await UserBookingServices.getUserBookingsFromDB(userFromToken);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User bookings retrieved successfully',
    data: result,
  });
});

export const UserBookingControllers = {
  getUserBookings,
};
