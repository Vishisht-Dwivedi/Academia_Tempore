import TeacherModel from "../../../models/Teachers.js";
/**
 * Checks if a teacher's proposed schedule for a new classroom collides
 * with any of their existing schedules in other classrooms.
 *
 * @async
 * @function checkTeacherCollision
 * @param {string} teacherCode - The unique code of the teacher (e.g., "SS", "VC").
 * @param {Object<string, Set<number>>} scheduleMap - A map of days to a set of already assigned slot numbers for the teacher.
 * @param {mongoose.Types.ObjectId|string} teacherId - The MongoDB ID of the teacher (used to verify slot ownership).
 * @param {string} room - The room code of the new classroom being evaluated (to skip self-check).
 * @returns {Promise<void>} Resolves if no collision is found. Throws an error if a time conflict is detected.
 * @throws {Error} If a slot on the same day already exists in another classroom.
 */
export async function checkTeacherCollision(teacherCode, scheduleMap, teacherId, room) {
    const teacherDoc = await TeacherModel.findOne({ code: teacherCode }).populate("classes");

    for (const classroom of teacherDoc.classes) {
        if (classroom.room === room) continue;

        for (const day of classroom.schedule) {
            for (const slot of day.slots) {
                if (slot.teacher.toString() === teacherId.toString()) {
                    if (scheduleMap[day.day].has(slot.slot)) {
                        throw new Error(`Collision: ${teacherDoc.name} has a clash on ${day.day} at slot ${slot.slot} in rooms ${room} and ${classroom.room}`);
                    }
                    scheduleMap[day.day].add(slot.slot);
                }
            }
        }
    }
}
