import { z } from 'zod';

export const slotCreationValidationSchema = z.object({
  body: z.object({
    room: z.string({
      required_error: 'Room is required',
    }),

    date: z.string({
      required_error: 'Date is required',
    }),
    startTime: z.string({
      required_error: 'Start time is required',
    }),
    endTime: z.string({
      required_error: 'End time is required',
    }),
  }),
});

export const SlotValidation = {
  slotCreationValidationSchema,
};
