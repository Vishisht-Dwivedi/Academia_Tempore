import { z } from "zod";
import { capitalizeName } from "../utils/capitalizeString.js";
import { uppercaseString } from "../utils/uppercaseString.js";
export const teacherSchema = z
    .object({
        name: z.string().min(1).transform(capitalizeName),
        code: z.string().min(1).transform(uppercaseString),
        email: z.string().email(),
        password: z.string().min(6).optional(), // Raw password (not hashed yet)
        classes: z.array(z.string()).optional(), // ObjectIds as strings
        subjects: z.array(z.string()).optional(),
    })
    .strict();
