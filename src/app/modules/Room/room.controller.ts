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

export const RoomControllers = {
  createRoom
};