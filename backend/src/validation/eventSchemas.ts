import { z } from "zod";

export const createEventSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required"),
        description: z.string().optional(),
        date: z.string(),
        location: z.string().optional(),
        capacity: z.number().int().positive().optional(),
    }),
});

export const updateEventSchema = z.object({
    params: z.object({
        id: z.string().min(1),
    }),
    body: z
        .object({
            title: z.string().min(1).optional(),
            description: z.string().optional(),
            date: z.string().optional(),
            location: z.string().optional(),
            capacity: z.number().int().positive().optional(),
        })
        .refine((body) => Object.keys(body).length > 0, {
            message: "At least one field must be provided",
        }),
});

export const idParamSchema = z.object({
    params: z.object({
        id: z.string().min(1),
    }),
});