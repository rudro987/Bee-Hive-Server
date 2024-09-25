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
    
    amenities: z.array(z.string()).nonempty('Amenities list cannot be empty'),
  }),
});

export const RoomValidation = {
  roomValidationSchema
}