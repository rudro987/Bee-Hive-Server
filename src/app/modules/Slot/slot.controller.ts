import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { SlotServices } from './slot.service';

const createSlots = catchAsync(async (req, res) => {
  const result = await SlotServices.createSlotsForRoom(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots created successfully',
    data: result,
  });
});

const getAlllRooms = catchAsync(async (req, res) => {
    const result = await SlotServices.getAllSlotsFromDB(req.query);
  
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Available slots retrieved successfully',
      data: result,
    });
  });

  const deleteSlot = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SlotServices.deleteSlotFromDB(id);
  
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'Slot deleted successfully',
      data: result,
    });
  });

export const SlotControllers = {
  createSlots,
  getAlllRooms,
  deleteSlot
};
