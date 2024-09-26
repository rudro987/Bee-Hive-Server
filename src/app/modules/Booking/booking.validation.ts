import { z } from 'zod';

export const bookingValidationSchema = z.object({
    body: z.object({
        date: z.string({ required_error: "Date is required" }),
        slots: z.array(z.string({ required_error: "Slots id is required" })),
        room: z.string({ required_error: "Room id is required" }),
        user: z.string({ required_error: "User id is required" }),
        isDeleted: z.boolean().optional().default(false),
        totalAmount: z.number(),
        isConfirmed: z.enum(['confirmed', 'unconfirmed']).optional().default('unconfirmed'),
      }),
});
