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

const getSingleRoomFromDB = async (id: string) => {
  const result = await Room.findById(id);
  return result;
};

const updateRoomIntoDB = async (id: string, payload: Partial<TRoomType>) => {
  const result = await Room.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteRoomFromDB = async (id: string) => {
  const result = await Room.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

export const RoomServices = {
  createRoomIntoDB,
  getAllRoomsFromDB,
  getSingleRoomFromDB,
  updateRoomIntoDB,
  deleteRoomFromDB,
};
