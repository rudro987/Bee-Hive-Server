import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TSlotCreation, TSlotType } from './slot.interface';
import { Slot } from './slot.model';

const createSlotsForRoom = async (payload: TSlotCreation) => {
  const { room, date, startTime, endTime } = payload;

  const slots = await Slot.createSlotsForRoom({ room, date, startTime, endTime });

  if (!slots || slots.length === 0) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create slots');
  }

  return slots;
};

export const SlotService = {
  createSlotsForRoom,
};
