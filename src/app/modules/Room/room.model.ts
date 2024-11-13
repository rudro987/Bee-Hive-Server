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
  image: {
    type: String,
    required: true,
  },
  gallery: {
    type: [String],
  },
  amenities: {
    type: [String],
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},
{
  timestamps: true,
});

// Query Middleware
roomScehma.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

roomScehma.statics.isRoomExists = async function(name: string) {
  return await Room.findOne({ name })
}

roomScehma.statics.isRoomNoExists = async function(roomNo: number) {
  return await Room.findOne({ roomNo })
}

export const Room = model<TRoomType, RoomModel>('Room', roomScehma);