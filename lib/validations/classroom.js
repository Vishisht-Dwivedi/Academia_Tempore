import { z } from "zod";
import { uppercaseString } from "../utils/uppercaseString.js";
// Classroom schema
export const classroomSchema = z
    .object({
        room: z.string().min(1).transform(uppercaseString),
    })
    .strict();
