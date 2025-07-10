import { z } from "zod";
import { lowercaseString } from "../utils/lowercaseString.js";
import { capitalizeName } from "../utils/capitalizeString.js";
import { uppercaseString } from "../utils/uppercaseString.js";

export const subjectSchema = z
    .object({
        code: z.string().min(1).transform(uppercaseString),
        name: z.string().min(1).transform(capitalizeName),
        type: z.string().transform(lowercaseString).pipe(z.enum(["theory", "lab"])),
        teachers: z.array(z.string()).optional(), // ObjectId strings
    })
    .strict();
