import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { RoomServices } from './room.service';
import AppError from '../../errors/AppError';

const createRoom = catchAsync(async (req, res) => {
  const result = await RoomServices.createRoomIntoDB(req.body);
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Room added successfully',
    data: result,
  });
});

const getAlllRooms = catchAsync(async (req, res) => {
  const result = await RoomServices.getAllRoomsFromDB();

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rooms retrieved successfully',
    data: result,
  });
});

const getSingleRoom = catchAsync(async (req, res) => {
  const { roomId } = req.params;
  const result = await RoomServices.getSingleRoomFromDB(roomId);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Room retrieved successfully',
    data: result,
  });
});

const updateRoom = catchAsync(async (req, res) => {
  const { roomId } = req.params;
  const result = await RoomServices.updateRoomIntoDB(roomId, req.body);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Room updated successfully',
    data: result,
  });
});

const deleteRoom = catchAsync(async (req, res) => {
  const { roomId } = req.params;
  const result = await RoomServices.deleteRoomFromDB(roomId);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Room deleted successfully',
    data: result,
  });
});

export const RoomControllers = {
  createRoom,
  getAlllRooms,
  getSingleRoom,
  updateRoom,
  deleteRoom,
};
