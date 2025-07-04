import { dayScheduleSchema } from "../../../lib/validations/schedule.js";
import createSlot from "./slot/create.js";

/**
 * Validates and processes a day's schedule with nested slot objects.
 * Converts each slot to an ID-resolved format.
 *
 * @async
 * @function createSchedule
 * @param {{ day: string, slots: Array<Object> }} input - Day schedule input.
 * @returns {Promise<{ day: string, slots: Array<Object> }>} Validated and transformed schedule object.
 * @throws {Error} If validation or any slot creation fails.
 */
export default async function createSchedule(input) {
    const parsed = dayScheduleSchema.safeParse(input);

    if (!parsed.success) {
        throw new Error(`Invalid schedule: ${parsed.error.message}`);
    }

    const { day, slots } = parsed.data;

    const slotsToSave = await Promise.all(
        slots.map((slot) => createSlot(slot))
    );

    return {
        day,
        slots: slotsToSave,
    };
}
