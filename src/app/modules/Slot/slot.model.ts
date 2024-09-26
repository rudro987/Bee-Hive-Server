import { Schema, model } from 'mongoose';
import { SlotModel, TSlotType } from './slot.interface';

const slotSchema = new Schema<TSlotType, SlotModel>({
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});


slotSchema.pre('find', function (next) {
  const queryOptions = this.getOptions();
  if (!queryOptions.includeBooked) {
    this.find({ isBooked: { $ne: true } });
  }
  next();
});

slotSchema.statics.createSlotsForRoom = async function (payload) {
  const { room, date, startTime, endTime } = payload;

  const slotDuration = 60;

  const start =
    parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
  const end =
    parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);

  const totalDuration = end - start;
  const numberOfSlots = totalDuration / slotDuration;

  const slots: TSlotType[] = [];

  for (let i = 0; i < numberOfSlots; i++) {
    const slotStartTimeInMinutes = start + i * slotDuration;

    const slotEndTimeInMinutes = slotStartTimeInMinutes + slotDuration;

    const slotStartTime = formatTime(slotStartTimeInMinutes);
    const slotEndTime = formatTime(slotEndTimeInMinutes);

    slots.push({
      room,
      date,
      startTime: slotStartTime,
      endTime: slotEndTime,
      isBooked: false,
    });
  }

  return this.insertMany(slots);
};

function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

export const Slot = model<TSlotType, SlotModel>('Slot', slotSchema);
