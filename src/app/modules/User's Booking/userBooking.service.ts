/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import { Booking } from "../Booking/booking.model";

const getUserBookingsFromDB = async (userFromToken: any) => {

    const user = await User.findOne({ email: userFromToken.userEmail });
    
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    const bookings = await Booking.find({ user: user._id })
    .populate({
      path: 'slots',
      options: { includeBooked: true },
    })
      .populate('room')
      .select('-user')
    
    return bookings;
  };

  export const UserBookingServices = {
    getUserBookingsFromDB
  }
  