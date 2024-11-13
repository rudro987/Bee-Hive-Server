import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TRoomType } from './room.interface';
import { Room } from './room.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createRoomIntoDB = async (payload: TRoomType) => {
  if (await Room.isRoomExists(payload.name)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `${payload.name} - This Room Name already exists!`,
    );
  }

  if (await Room.isRoomNoExists(payload.roomNo)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `${payload.roomNo} - This Room No is Already Assigned!`,
    );
  }

  const result = await Room.create(payload);
  return result;
};

const getAllRoomsFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = ['name', 'roomNo', 'amenities'];
  const roomsQuery = new QueryBuilder(Room.find(), query)
  .search(searchableFields)
  .filter()
  .sort()
  .paginate()

  const result = await roomsQuery.modelQuery;
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
