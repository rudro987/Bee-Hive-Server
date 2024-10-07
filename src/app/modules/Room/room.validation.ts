import { z } from "zod";

const roomValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Room Name is required',
    }),
    
    roomNo: z.number({
      required_error: 'Room number is required',
    }),
    
    floorNo: z.number({
      required_error: 'Floor number is required',
    }),
    
    capacity: z.number({
      required_error: 'Capacity is required',
    }).min(1, 'Capacity must be at least 1'),
    
    pricePerSlot: z.number({
      required_error: 'Price per slot is required',
    }).min(0, 'Price per slot must be a positive number'),

    image: z.string({
      required_error: 'Image is required',
    }),

    gallery: z.array(z.string()),
    
    amenities: z.array(z.string()).nonempty('Amenities list cannot be empty'),
  }),
});

const updateRoomValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),

    roomNo: z.number().optional(),

    floorNo: z.number().optional(),

    capacity: z.number().min(1, 'Capacity must be at least 1').optional(),

    pricePerSlot: z.number().min(0, 'Price per slot must be a positive number').optional(),

    image: z.string().optional(),

    gallery: z.array(z.string()).optional(),

    amenities: z.array(z.string()).optional(),
  }),
});

export const RoomValidation = {
  roomValidationSchema,
  updateRoomValidationSchema
}