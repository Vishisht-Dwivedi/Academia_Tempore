import { normalizeString } from "../../constructors/utils/normalizeString.js";
import SubjectModel from "../../models/Subjects.js";
import removeBacklink from "../utils/removeBacklink/index.js";

/**
 * Deletes a subject from the database by its normalized code and type.
 * 
 * @async
 * @function deleteSubject
 * 
 * @param {Object} subject - The subject identifier.
 * @param {string} subject.code - The subject code (e.g., "CS101").
 * @param {string} subject.type - The subject type (e.g., "theory" or "lab").
 * 
 * @returns {Promise<Object>} A result object indicating success or failure.
 * - Success: `{ status: "OK", message: "Subject <code> deleted successfully." }`
 * - Failure: throws an error with an appropriate message.
 * 
 * @throws Will throw an error if:
 * - The subject is not found in the database.
 * - The backlink removal fails.
 */
export default async function deleteSubject(subject) {
    const { code, type } = subject;
    const normalisedCode = normalizeString(code);
    const normalisedType = normalizeString(type);
    const existingSubject = await SubjectModel.findOne({ code: normalisedCode, type: normalisedType }).lean();
    if (!existingSubject) {
        throw new Error(`Subject with code: ${code} and type: ${type} does not exist`);
    }
    const status = await removeBacklink("Subject", existingSubject);
    if (status.success) {
        await SubjectModel.findByIdAndDelete(existingSubject._id);
        return {
            status: "OK",
            message: `Subject ${code} deleted successfully.`
        };
    } else {
        throw new Error(`Error in deleting subject: ${code}, error: ${status.error}`);
    }
}