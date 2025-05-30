import { normalizeString } from "../../constructors/utils/normalizeString.js";
import TeacherModel from "../../models/Teachers.js";
import removeBacklink from "../utils/removeBacklink/index.js";
/**
 * Deletes a teacher from the database by their code.
 * 
 * Steps:
 * - Normalizes the teacher code.
 * - Finds the teacher document by the normalized code.
 * - Removes all backlinks referencing this teacher.
 * - Deletes the teacher document from the database.
 * 
 * If backlinks cannot be removed, the function throws an error to prevent orphaned references.
 * 
 * @async
 * @function deleteTeacher
 * 
 * @param {string} teacherCode - The unique code identifying the teacher (e.g., "CS101").
 * 
 * @returns {Promise<Object>} An object containing the deletion status and a success message.
 * - If successful: `{ status: "OK", message: "Teacher <code> deleted successfully." }`
 * 
 * @throws Will throw an error if:
 * - The teacher is not found.
 * - Backlink removal fails.
 * - A database operation fails.
 */
export default async function deleteTeacher(teacherCode) {
    const normalizedCode = normalizeString(teacherCode);
    const teacherDoc = await TeacherModel.findOne({ code: normalizedCode }, { _id: true });
    if (!teacherDoc) {
        throw new Error(`Teacher with Code: ${teacherCode} not found`);
    }
    const result = await removeBacklink("Teacher", teacherDoc._id);
    if (result.success) {
        await TeacherModel.findByIdAndDelete(teacherDoc._id);
        return {
            status: "OK",
            message: `Teacher ${teacherCode} deleted successfully.`
        };
    } else {
        throw new Error(`Failed to remove backlinks for teacher ${teacherCode}: ${result.error}`);
    }
}