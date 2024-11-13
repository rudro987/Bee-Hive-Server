import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string({ required_error: "Email is required" }),
    password: z.string({ required_error: "Password is required" }),
    phone: z.string({ required_error: "Phone Number is required" }),
    address: z.string({ required_error: "Address is required" }),
    isDeleted: z.boolean().optional().default(false),
  }),
});

const updateUserRoleValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    isDeleted: z.boolean().optional(),
    role: z.string().optional(),
  }),
});

export const UserValidations = {
  userValidationSchema,
  updateUserRoleValidationSchema
}