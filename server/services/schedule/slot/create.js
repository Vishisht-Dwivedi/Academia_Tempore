import { slotInputSchema } from "../../../../lib/validations/slot.js";
import teacherToID from "../../utils/objToID/teacherToID.js";
import subjectToID from "../../utils/objToID/subjectToID.js";

/**
 * Validates a slot object, converts teacher and subject to their respective `_id`s,
 * and prepares the slot for database insertion.
 *
 * @async
 * @function createSlot
 * @param {Object} slotObj - A full nested slot object (with full teacher and subject inside).
 * @returns {Promise<Object>} A slot object with teacher and subject replaced by their ObjectIDs.
 * @throws {Error} If validation or ID resolution fails.
 */
export default async function createSlot(slotObj) {
    const parsed = slotInputSchema.safeParse(slotObj);

    if (!parsed.success) {
        throw new Error(`Invalid slot: ${parsed.error.message}`);
    }

    const { slot, teacher, subject } = parsed.data;

    const teacherId = await teacherToID(teacher);
    const subjectId = await subjectToID(subject);

    return {
        slot,
        teacher: teacherId,
        subject: subjectId,
    };
}
