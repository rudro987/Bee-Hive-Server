import { Model, Types } from 'mongoose';

export type TSlotType = {
  room: Types.ObjectId;
  date: string; 
  startTime: string; 
  endTime: string; 
  isBooked: boolean;
};

export type TSlotCreation = {
  room: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
};

export interface SlotModel extends Model<TSlotType> {
  createSlotsForRoom(payload: TSlotCreation): Promise<TSlotType[]>;
}
