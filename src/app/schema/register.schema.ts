import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).min(3, { message: "Name must be at least 3 characters" }).max(15, { message: "Name must be at most 15 characters" }),
  email: z.string().min(1, { message: "Email is required" }).pipe(z.email({ message: "Invalid email address" })),
  password: z.string().min(6, 'Password must be at least 6 characters')
      .regex(/[A-Z]/, 'Include at least one uppercase letter')
      .regex(/[a-z]/, 'Include at least one lowercase letter')
      .regex(/[0-9]/, 'Include at least one number')
      .regex(/[^A-Za-z0-9]/, 'Include at least one special character'),
  rePassword: z.string().min(1, { message: "Confirm password is required" }),
  phone: z.string().min(1, { message: "Phone is required" }).regex(/^01[0125][0-9]{8}$/, { message: "Enter a valid 11-digit Egyptian phone number" }),
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords do not match",
  path: ["rePassword"],
});

export type registerSchemaType = z.infer<typeof registerSchema>;