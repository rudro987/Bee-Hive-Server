const exampleNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string(),
  lastName: z.string(),
});

export const exampleCreateUserValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    faculty: z.object({
      designation: z.string(),
      name: exampleNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      academicDepartment: z.string(),
      profileImg: z.string(),
    }),
  }),
});

const updateExampleUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

export const updateExampleUserValidationSchema = z.object({
  body: z.object({
    faculty: z.object({
      designation: z.string().optional(),
      name: updateExampleUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const exampleValidations = {
  exampleCreateUserValidationSchema,
  updateExampleUserValidationSchema,
};