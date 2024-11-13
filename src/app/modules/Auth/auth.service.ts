/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUserTypes } from '../User/user.interface';
import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import config from '../../config';
import { Document } from 'mongoose';

const signUpUserIntoDB = async (payload: TUserTypes) => {
  if (await User.isUserExists(payload.email)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'User with this email already exists!',
    );
  }

  payload.role = 'user';

  const result = await User.create(payload);
  const signUpUserResponse: any = result.toObject();

  delete signUpUserResponse.password;
  delete signUpUserResponse.isDeleted;

  return signUpUserResponse;
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExists(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not match');
  }

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const userDoc = user as unknown as Document;

  const userData = userDoc.toObject();
  delete userData.password;

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    userData,
  };
};

const refreshToken = async (token: string) => {
 
    let decoded;

    try {
      decoded = jwt.verify(
        token,
        config.jwt_refresh_secret as string,
      ) as JwtPayload;
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'this is from refreshtoken route: unauthorized')
    }

  const { userEmail } = decoded;

  const user = await User.isUserExists(userEmail);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  signUpUserIntoDB,
  loginUser,
  refreshToken,
};
