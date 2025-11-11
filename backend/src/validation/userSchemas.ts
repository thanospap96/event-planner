import { z } from "zod";

export const usernameParamSchema = z.object({
    params: z.object({
        username: z.string().min(1),
    }),
});

export const findUserByEmailQuerySchema = z.object({
    query: z.object({
        email: z
            .string()
            .trim()
            .toLowerCase()
            .pipe(z.email()),
    }),
});

export const idParamSchema = z.object({
    params: z.object({
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
    }),
});

