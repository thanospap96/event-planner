import {z} from "zod";

export const registerSchema = z.object({
   body: z.object({
       username: z.string().min(3, "Username must be at least 3 characters long").max(30),
       email: z.email("Invalid email address"),
       password: z.string().min(5, "Password must be at least 5 characters long").max(50),
   })
});

export const loginSchema = z.object({
  body: z.object({
      email: z.email("Invalid email address"),
      password: z.string().min(5, "Password must be at least 5 characters long"),
  })
});
