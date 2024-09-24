import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUserTypes } from "../User/user.interface";
import { User } from "../User/user.model";

const signUpUserIntoDB = async (
    payload: TUserTypes
  ) => {
    if(await User.isUserExists(payload.email)){
      throw new AppError(httpStatus.BAD_REQUEST, 'User with this email already exists!')
    }
  
    const result = await User.create(payload);
    return result
  };

  export const AuthServices = {
    signUpUserIntoDB,
  };