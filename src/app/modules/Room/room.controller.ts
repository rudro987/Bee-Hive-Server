import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { RoomServices } from "./room.service";

const createRoom = catchAsync(async (req, res) => {
  const result = await RoomServices.createRoomIntoDB(req.body);
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Room added successfully",
    data: result,
  })
});

const getAlllRooms = catchAsync(async (req, res) => {
  const result =
    await RoomServices.getAllRoomsFromDB();

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Rooms retrieved successfully",
      data: result,
    })
});

const getSingleRoom = catchAsync(async (req, res) => {
  const {roomId} = req.params
  const result = await RoomServices.getSingleRoomFromDB(roomId)

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Room retrieved successfully",
      data: result,
    })
});

export const RoomControllers = {
  createRoom,
  getAlllRooms,
  getSingleRoom
};