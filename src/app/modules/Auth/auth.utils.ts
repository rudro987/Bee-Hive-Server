import { TUserTypes } from '../User/user.interface';
import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: TUserTypes,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn });
};