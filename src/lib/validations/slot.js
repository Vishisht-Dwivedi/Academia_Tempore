import { z } from "zod";
import { subjectSchema } from "./subject.js";
import { teacherSchema } from "./teacher.js";
import { uppercaseString } from "../utils/uppercaseString.js";
export const slotInputSchema = z.object({
    slot: z.number().min(1).max(9),
    subject: subjectSchema,
    teacher: teacherSchema,
    room: z.string().min(1)
});
