import ClassroomModel from "../../models/Classrooms.js";
import removeBacklink from "../utils/removeBacklink/index.js";
/**
 * Deletes a classroom from the database by its room code.
 * 
 * Steps:
 * - Finds the classroom by normalized room code.
 * - Iterates over the schedule to remove teacher backlinks.
 * - Deletes the classroom document only if all backlinks were removed.
 * 
 * Handles partial unlinking cases and reports success accordingly.
 * 
 * @async
 * @function deleteClassroom
 * 
 * @param {string} roomCode - The unique identifier for the classroom (e.g., "CSE-101").
 * 
 * @returns {Promise<Object>} An object indicating the deletion result.
 * - If successful: `{ status: "OK", message: "Classroom <roomCode> deleted successfully." }`
 * - If partially successful: `{ status: "Partially OK", message: "Not all teacher backlinks were removed successfully." }`
 * 
 * @throws Will throw an error if:
 * - The classroom is not found.
 * - A database or backlink operation fails.
 */

export default async function deleteClassroom(roomCode) {
    const upperCaseCode = roomCode.trim().toUpperCase();
    const existingClassroom = await ClassroomModel.findOne({ room: upperCaseCode });

    if (!existingClassroom) {
        throw new Error(`Classroom with room: ${roomCode} not found`);
    }

    const schedule = existingClassroom.schedule;
    let resultCount = 0;
    let teacherSet = new Set();

    try {
        for (const day of schedule) {
            for (const slot of day.slots) {
                const teacherId = slot.teacher;
                if (teacherId && !teacherSet.has(teacherId.toString())) {
                    teacherSet.add(teacherId.toString());
                    try {
                        const status = await removeBacklink("Teacher", teacherId, { type: "classroom", targetID: existingClassroom._id });
                        if (status.success) resultCount++;
                    } catch (error) {
                        console.error(`Error in removing backlink for teacher ${teacherId}:`, error);
                    }
                }
            }
        }

        if (resultCount === teacherSet.size) {
            await ClassroomModel.findByIdAndDelete(existingClassroom._id);
            return {
                status: "OK",
                message: `Classroom ${roomCode} deleted successfully.`
            };
        } else {
            return {
                status: "Partially OK",
                message: `Not all teacher backlinks were removed successfully.`
            };
        }
    } catch (error) {
        throw error;
    }
}
