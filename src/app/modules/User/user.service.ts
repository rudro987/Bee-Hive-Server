import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUserTypes } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (
  payload: TUserTypes
) => {
  if(await User.isUserExists(payload.email)){
    throw new AppError(httpStatus.BAD_REQUEST, 'User with this email already exists!')
  }

  const result = await User.create(payload);
  return result
};

export const UserServices = {
  createUserIntoDB,
};