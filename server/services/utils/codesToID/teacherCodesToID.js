import TeacherModel from "../../../models/Teachers.js";
import { normalizeString } from "../../../constructors/utils/normalizeString.js";
/**
 * Converts an array of teacher codes to their corresponding MongoDB ObjectIDs.
 *
 * @async
 * @function
 * @param {string[]} teachers - An array of teacher codes (e.g., ["RK", "RC"]).
 * @returns {Promise<ObjectId[]>} A promise that resolves to an array of ObjectIDs.
 *
 * @throws {Error} If any teacher code does not exist in the database.
 *
 * @example
 * const teacherIds = await teacherCodeToID(["RK", "RC"]);
 * // Output: [ObjectId("..."), ObjectId("...")]
 */
export default async function teacherCodeToID(teachers) {
    const teacherIds = await Promise.all(
        teachers.map(async (teacher) => {
            const teacherID = await TeacherModel.findOne({ code: normalizeString(teacher) }, { _id: true });
            if (!teacherID) {
                throw new Error(`Teacher with code '${teacher}' not found`);
            }
            return teacherID._id;
        })
    );
    return teacherIds;
}
