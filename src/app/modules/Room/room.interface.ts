/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type TRoomType = {
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  image: string;
  gallery?: string[];
  amenities: string[];
  isDeleted?: boolean
}

export interface RoomModel extends Model<TRoomType> {
  isRoomExists(name: string): Promise<TRoomType>;
  isRoomNoExists(roomNo: number): Promise<TRoomType>;
}