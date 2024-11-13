import { model, Schema } from "mongoose";
import { TBookingsType } from "./booking.interface";

const bookingSchema = new Schema<TBookingsType>({
    date: {
      type: String,
      required: true,
    },
    slots: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Slot',
        required: true,
      },
    ],
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    totalAmount: {
      type: Number,
    },
    isConfirmed: {
      type: String,
      enum: ['confirmed', 'unconfirmed'],
      default: 'unconfirmed',
    },
  },
  {
    timestamps: true,
  });

  bookingSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
  });
  
  export const Booking = model<TBookingsType>('Booking', bookingSchema);