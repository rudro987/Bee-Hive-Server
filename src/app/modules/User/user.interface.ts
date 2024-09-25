import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUserTypes = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'user';
  address: string;
  isDeleted: boolean;
};

export interface UserModel extends Model<TUserTypes> {
  isUserExists(email: string) : Promise<TUserTypes | null>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;