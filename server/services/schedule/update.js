import { handleScheduleSlotUpdate } from "./utils/handleScheduleSlotUpdate.js";
import { scheduleSchema } from "../../../lib/validations/schedule.js";

/**
 * Updates classroom schedule based on fully nested validated data
 */
export const updateSchedule = async (updatedSchedule) => {

    const parsed = scheduleSchema.safeParse(updatedSchedule);

    if (!parsed.success) {
        throw new Error(`Invalid schedule input: ${parsed.error.message}`);
    }

    const schedule = parsed.data;
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

    for (const day of days) {
        if (!schedule[day]) continue;
        for (const slot of schedule[day]) {
            await handleScheduleSlotUpdate(day, slot);
        }
    }

    return {
        success: true,
        message: "Schedule updated successfully",
    };
};
