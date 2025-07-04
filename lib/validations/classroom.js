import { z } from "zod";
import { dayScheduleSchema } from "./schedule.js";
import { uppercaseString } from "../utils/uppercaseString.js";
// Classroom schema
export const classroomSchema = z
    .object({
        room: z.string().min(1).transform(uppercaseString),
        schedule: z.array(dayScheduleSchema).optional(),
    })
    .strict();
