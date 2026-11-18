import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).pipe(z.email({ message: "Invalid email address" })),
  password: z.string().min(6, 'Password must be at least 6 characters')
      .regex(/[A-Z]/, 'Include at least one uppercase letter')
      .regex(/[a-z]/, 'Include at least one lowercase letter')
      .regex(/[0-9]/, 'Include at least one number')
      .regex(/[^A-Za-z0-9]/, 'Include at least one special character'),
});

export type loginSchemaType = z.infer<typeof loginSchema>;