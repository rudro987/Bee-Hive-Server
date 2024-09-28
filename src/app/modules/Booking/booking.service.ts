/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Room } from '../Room/room.model';
import { User } from '../User/user.model';
import { TBookingsType } from './booking.interface';
import { Booking } from './booking.model';
import { Slot } from '../Slot/slot.model';
import mongoose from 'mongoose';

const createBookingsForSlotsIntoDB = async (
  payload: TBookingsType,
  userFromToken: { email: string },
) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const { room, slots, user } = payload;

    const userDetails = await User.findById(user).session(session);

    if (!userDetails) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    if (userDetails.email !== userFromToken.email) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Wrong user! Authorization failed!',
      );
    }

    const roomDetails = await Room.findById(room).session(session);

    if (!roomDetails) {
      throw new AppError(httpStatus.NOT_FOUND, 'Room not found');
    }

    const slotDetails = await Slot.find({ _id: { $in: slots }, room }).session(
      session,
    );
    if (slotDetails.length !== slots.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'One or more slots do not belong to the specified room',
      );
    }

    slotDetails.forEach((slot) => {
      if (slot.isBooked) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'One or more slots are already booked',
        );
      }
    });

    const pricePerSlot = roomDetails.pricePerSlot;

    const totalAmount = pricePerSlot * slots.length;

    const bookingData = {
      ...payload,
      totalAmount,
    };

    const result = await Booking.create([bookingData], { session });

    await Slot.updateMany(
      { _id: { $in: slots } },
      { isBooked: true },
      { session },
    );

    await session.commitTransaction();

    const populatedResult = await Booking.findById(result[0]._id)
      .populate({
        path: 'slots',
        options: { includeBooked: true },
      })
      .populate('room')
      .populate('user');

    session.endSession();

    return populatedResult;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find()
    .populate({
      path: 'slots',
      options: { includeBooked: true },
    })
    .populate('room')
    .populate('user');

  return result;
};

const updateBookingIntoDB = async (
  id: string,
  payload: Partial<TBookingsType>,
) => {
  const result = await Booking.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteBookingFromDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

export const BookingServices = {
  createBookingsForSlotsIntoDB,
  getAllBookingsFromDB,
  updateBookingIntoDB,
  deleteBookingFromDB,
};
