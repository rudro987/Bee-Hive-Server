import { z } from 'zod';

const bookingValidationSchema = z.object({
  body: z.object({
    date: z.string({ required_error: 'Date is required' }),
    slots: z.array(z.string({ required_error: 'Slots id is required' })),
    room: z.string({ required_error: 'Room id is required' }),
    user: z.string({ required_error: 'User id is required' }),
    isDeleted: z.boolean().optional().default(false),
    totalAmount: z.number().optional(),
    isConfirmed: z
      .enum(['confirmed', 'unconfirmed'])
      .optional()
      .default('unconfirmed'),
  }),
});

const updateValidationSchema = z.object({
  body: z.object({
    date: z.string().optional(),
    slots: z.array(z.string()).optional(),
    room: z.string().optional(),
    user: z.string().optional(),
    isConfirmed: z.string().optional()
  }),
});

export const BookingsValidation = {
  bookingValidationSchema,
  updateValidationSchema
};
