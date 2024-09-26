import { Types } from "mongoose";

export type TBookingsType = {
    date: string; 
    slots: Types.ObjectId[]; 
    room: Types.ObjectId; 
    user: Types.ObjectId;
    isDeleted?: boolean;
    totalAmount?: Number;
    isConfirmed?: "confirmed" | "unconfirmed" 
};