import { z } from "zod";
import { slotInputSchema } from "./slot.js";

export const scheduleSchema = z.object({
    monday: z.array(slotInputSchema).optional(),
    tuesday: z.array(slotInputSchema).optional(),
    wednesday: z.array(slotInputSchema).optional(),
    thursday: z.array(slotInputSchema).optional(),
    friday: z.array(slotInputSchema).optional()
});
