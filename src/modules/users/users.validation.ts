import { z } from "zod";

export const signUpBodySchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Email is invalid" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    displayName: z.string().min(1, { message: "Display name is required" }),
    imageUrl: z.string().optional(),
  }),
});

export type SignUpBody = z.infer<typeof signUpBodySchema>["body"];

export const signInBodySchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Email is invalid" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  }),
});

export type SignInBody = z.infer<typeof signInBodySchema>["body"];
