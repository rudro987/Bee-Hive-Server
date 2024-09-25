import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUserTypes } from '../User/user.interface';
import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';

const signUpUserIntoDB = async (payload: TUserTypes) => {
  if (await User.isUserExists(payload.email)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'User with this email already exists!',
    );
  }

  const result = await User.create(payload);

  const signUpUserResponse: any = result.toObject();

  delete signUpUserResponse.password;
  delete signUpUserResponse.isDeleted;

  return signUpUserResponse;
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExists(payload.email);
  console.log(user);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const isDeleted = user?.isDeleted;

  if(isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  if (!(await User.passwordMatch(payload?.password, user?.password))){
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not match');
  }

  const jwtPayload = user;
  
  const accessToken = 
  
}

export const AuthServices = {
  signUpUserIntoDB,
};
