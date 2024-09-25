import jwt from 'jsonwebtoken';
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import config from "../../config";
import AppError from '../../errors/AppError';

const signUpUser = catchAsync(async (req, res) => {
  const result = await AuthServices.signUpUserIntoDB(req.body);
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "User registered successfully",
    data: result,
  })
})

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, refreshToken } = result;

  let decoded;

  try {
    decoded = jwt.verify(accessToken, config.jwt_access_secret as string)
  } catch (err) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Not authorized!');
  }

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true
  });

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    token: accessToken,
    data: decoded,
  })

})

export const AuthControllers = {
  signUpUser,
  loginUser
};