import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";

const getAlllUsers = catchAsync(async (req, res) => {
    const result = await UserServices.getAllUsersFromDB();
  
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'All Users data retrieved successfully',
      data: result,
    });
  });

  const updateUserRole = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const result = await UserServices.updateRoleIntoDB(userId, req.body);
  
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: 'User role updated successfully',
      data: result,
    });
  });

  export const UserControllers = {
    getAlllUsers,
    updateUserRole
  };