import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TRoomType } from './room.interface';
import { Room } from './room.model';

const createRoomIntoDB = async (payload: TRoomType) => {
  if (await Room.isRoomExists(payload.roomNo)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `${payload.name} with this room number already exists!`,
    );
  }

  const result = await Room.create(payload);
  
  return result;
};

const getAllRoomsFromDB = async () => {
  const result = await Room.find();
  return result;
};

export const RoomServices = {
  createRoomIntoDB,
  getAllRoomsFromDB
};
