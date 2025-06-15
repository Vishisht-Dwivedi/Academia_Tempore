import Schedule from "../../constructors/scheduleConstructor.js";
import createSlot from "./slot/create.js";

/**
 * Creates a schedule document-ready object from a day and slot definitions.
 *
 * @async
 * @function createSchedule
 * @param {string} day - The day for the schedule (e.g., "Monday").
 * @param {Array<Object>} slots - Array of slot objects, each containing subject & teacher.
 *
 * @returns {Promise<Object>} A validated, ID-resolved schedule object.
 *
 * @throws {Error} If validation or slot creation fails.
 */
export default async function createSchedule(day, slots) {
    const validatedSchedule = new Schedule(day, slots);

    const slotsToSave = await Promise.all(
        validatedSchedule.slots.map(slot => createSlot(slot))
    );

    return {
        day: validatedSchedule.day,
        slots: slotsToSave
    };
}
