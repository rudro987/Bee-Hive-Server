import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string({ required_error: "Email is required" }),
    password: z.string({ required_error: "Password is required" }),
    phone: z.string({ required_error: "Phone Number is required" }),
    role: z.string({ required_error: "Role is required" }),
    address: z.string({ required_error: "Address is required" }),
    isDeleted: z.boolean().optional().default(false),
  }),
});

export const UserValidations = {
  userValidationSchema
}