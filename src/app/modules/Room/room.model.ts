import { model, Schema } from 'mongoose';
import { RoomModel, TRoomType } from "./room.interface";

const roomScehma = new Schema<TRoomType, RoomModel>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  roomNo: {
    type: Number,
    required: true,
  },
  floorNo: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  pricePerSlot: {
    type: Number,
    required: true,
  },
  amenities: {
    type: [String],
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Query Middleware
roomScehma.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

roomScehma.statics.isRoomExists = async function(roomNo: number) {
  return await Room.findOne({ roomNo })
}

export const Room = model<TRoomType, RoomModel>('Room', roomScehma);