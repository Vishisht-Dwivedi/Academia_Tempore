import Slot from "../../../constructors/slotConstructor.js";
import teacherToID from "../../utils/objToID/teacherToID.js";
import subjectToID from "../../utils/objToID/subjectToID.js";

/**
 * Validates a slot object, converts teacher and subject to their respective `_id`s,
 * and prepares the slot for database insertion.
 *
 * @async
 * @function createSlot
 * @param {Object} slotObj - An object representing a single schedule slot.
 * @param {number} slotObj.slot - The slot number (1–8).
 * @param {Object} slotObj.subject - Subject details.
 * @param {string} slotObj.subject.name - Subject name.
 * @param {string} slotObj.subject.code - Subject code.
 * @param {string} slotObj.subject.type - Subject type ("theory" or "lab").
 * @param {Object} slotObj.teacher - Teacher details.
 * @param {string} slotObj.teacher.name - Teacher name.
 * @param {string} slotObj.teacher.code - Teacher code.
 *
 * @returns {Promise<Object>} A slot object ready for MongoDB, with teacher and subject replaced by their ObjectIDs.
 *
 * @throws {Error} If validation or ID resolution fails.
 */
export default async function createSlot(slotObj) {
    const { slot, subject, teacher } = slotObj;

    const validatedSlot = new Slot(slot, subject, teacher);

    const slotToSave = {
        slot: validatedSlot.slot,
        teacher: await teacherToID(validatedSlot.teacher),
        subject: await subjectToID(validatedSlot.subject)
    };

    return slotToSave;
}