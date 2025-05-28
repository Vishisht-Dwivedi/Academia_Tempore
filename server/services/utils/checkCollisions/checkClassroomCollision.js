import { initializeTeacherSchedules } from "./initializeTeacherSchedules.js";
import { populateClassroomSchedule } from "./populateClassroomSchedule.js";
import { checkTeacherCollision } from "./checkTeacherCollision.js";
import parseTeachersFromClassroom from "./parseTeachersFromClassroom.js";
/**
 * Checks whether adding the classroom causes any teacher schedule collisions.
 * - Builds teacher-wise schedule from the classroom’s data.
 * - Validates each teacher's combined schedule for conflicts.
 *
 * @async
 * @function checkClassroomCollision
 * @param {Object} classroom - The classroom document (after population).
 * @param {string} classroom.room - The room code.
 * @param {Array<Object>} classroom.schedule - Populated schedule containing slots and linked teachers.
 * @returns {Promise<boolean>} Returns `{status: true}` if no collision; otherwise `{status: false, error}`.
 */
export default async function checkClassroomCollision(classroom) {
    const { room, schedule } = classroom;
    const { teacherCodes, teacherIDs } = parseTeachersFromClassroom(schedule);
    const teacherSchedules = initializeTeacherSchedules(teacherCodes);

    populateClassroomSchedule(schedule, teacherSchedules);

    for (const code of teacherCodes) {
        try {
            await checkTeacherCollision(
                code,
                teacherSchedules.get(code),
                teacherIDs.get(code),
                room
            );
        } catch (error) {
            return {
                status: false,
                error: error.message
            };
        }
    }

    return {
        status: true
    };
}
