import ClassroomModel from "../../../models/Classrooms.js";

/**
 * Checks if a classroom is free at the given day and slot.
 * 
 * @param {string} roomId - The ObjectId of the classroom.
 * @param {string} day - The day of the week (e.g., "monday").
 * @param {number} slot - The slot number (e.g., 1–8).
 * @returns {Promise<{ free: boolean, conflict?: Object }>}
 */
export default async function isClassroomFree(roomId, day, slot) {
    const roomDoc = await ClassroomModel.findById(roomId).lean();
    if (!roomDoc) {
        throw new Error(`Classroom with id: ${roomId} not found`);
    }

    const daySchedule = roomDoc.schedule.find((d) => d.day === day);
    if (!daySchedule) {
        return { free: true };
    }

    const conflictingSlot = daySchedule.slots.find((s) => s.slot === slot);
    if (conflictingSlot) {
        return {
            free: false,
            conflict: {
                room: roomDoc.room,
                day,
                slot,
                subjectId: conflictingSlot.subject?.toString(),
                teacherId: conflictingSlot.teacher?.toString(),
            }
        };
    }

    return { free: true };
}
