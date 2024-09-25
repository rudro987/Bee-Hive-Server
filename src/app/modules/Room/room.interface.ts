import { Model, Types } from "mongoose";

export type TRoomType = {
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  isDeleted: boolean
}

export interface RoomModel extends Model<TRoomType> {
  isRoomExists(roomNo: number): Promise<TRoomType>;
}