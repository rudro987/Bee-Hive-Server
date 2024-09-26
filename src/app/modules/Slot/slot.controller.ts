import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { SlotService } from './slot.service';

const createSlots = catchAsync(async (req, res) => {
  const result = await SlotService.createSlotsForRoom(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots created successfully',
    data: result,
  });
});

export const SlotController = {
  createSlots,
};
