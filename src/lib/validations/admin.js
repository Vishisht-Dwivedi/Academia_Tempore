import { z } from "zod";

export const adminSchema = z.object({
    name: z.string().min(1),
    code: z.string().min(1),
    email: z.string().email(),
    password_hash: z.string().min(6),
    isMaster: z.boolean().optional(),
});
