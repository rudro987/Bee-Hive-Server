import { TUserTypes } from '../User/user.interface';
import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: {userEmail: string, role: string},
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn });
};