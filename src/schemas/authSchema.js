import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().trim().min(6).max(255),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(6).max(255),
    email: z.string().trim().email(),
    password: z.string().trim().min(6).max(255),
    confirm: z.string().trim().min(6).max(255),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
