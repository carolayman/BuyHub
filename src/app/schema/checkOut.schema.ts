
import { z } from "zod"

export const checkoutSchema = z.object({
  details: z.string().trim().min(1,"Details is required").min(5, "Please enter your full address"),
  phone: z.string().trim().min(1,"Phone is required").regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
  city: z.string().trim().min(1,"City is required").min(3, "Please enter your city"),
  postalCode: z.string().trim().min(1, "Postal Code is required"),
})

export type checkoutSchemaType = z.infer<typeof checkoutSchema>
