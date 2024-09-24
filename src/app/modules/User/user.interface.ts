import { Model } from "mongoose";

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
}