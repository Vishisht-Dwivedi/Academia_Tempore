import TeacherModel from "../../../models/Teachers.js";
import SubjectModel from "../../../models/Subjects.js";
import isTeacherFree from "../../utils/collisionDetection/isTeacherFree.js";
import addBacklink from "../../utils/backlink/addBacklink.js";

/**
 * Verifies that all teachers in the schedule are free at their assigned times,
 * and prepares for backlinking.
 *
 * @param {Array<Object>} schedule - An array of day-wise schedules with populated teacher & subject ObjectIds
 * @throws {Error} - If a teacher is not free, throws with detailed conflict information
 */
export default async function verifyAndLinkClassroom(schedule) {
    for (const day of schedule) {
        for (const slot of day.slots) {
            const isFree = await isTeacherFree(slot.teacher, day.day, slot.slot);
            if (!isFree.free) {
                const { conflict } = isFree;
                const subjectDoc = await SubjectModel.findById(conflict.subjectId).lean();
                const teacherDoc = await TeacherModel.findById(conflict.teacherId).lean();

                throw new Error(
                    `Collision Detected:\n` +
                    `• Teacher: ${teacherDoc.name} (${teacherDoc.code})\n` +
                    `• Already teaching ${subjectDoc.name} (${subjectDoc.code}) on ${conflict.day}, Slot ${conflict.slot} in Room ${conflict.room}`
                );
            }
            //linking if free
            await addBacklink(slot.teacher, slot.subject, slot.room);
        }
    }
}
