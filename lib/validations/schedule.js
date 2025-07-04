import { z } from "zod";
import { slotInputSchema } from "./slot.js";
import { lowercaseString } from "../utils/lowercaseString.js";

// DaySchedule schema
export const dayScheduleSchema = z
    .object({
        day: z.string().transform(lowercaseString).pipe(z.enum(["monday", "tuesday", "wednesday", "thursday", "friday"])),
        slots: z
            .array(slotInputSchema)
            .refine(
                (slots) => {
                    const seen = new Set();
                    for (const s of slots) {
                        if (seen.has(s.slot)) return false;
                        seen.add(s.slot);
                    }
                    return true;
                },
                {
                    message: "Two or more classes allotted to the same slot",
                    path: ["slots"],
                }
            ),
    })
    .strict();
