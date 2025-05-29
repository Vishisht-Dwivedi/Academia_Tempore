import removeSubjectBacklinks from "./removeSubject.js";
import removeTeacherBacklinks from "./removeTeacherBacklink.js";
const backlinkRegister = {
    Subject: removeSubjectBacklinks,
    Teacher: removeTeacherBacklinks
}
/**
 * Dynamically removes backlinks from a specific object based on type.
 * Delegates the task to the appropriate handler (e.g., Subject or Teacher).
 *
 * @async
 * @function removeBacklink
 * @param {string} option - Type of object ("Subject", "Teacher", etc.).
 * @param {Object} object - The main object document (subject or teacher) to clean up.
 * @param {Object|null} objectIDToRemove - Optional descriptor (e.g., { type: "classroom", targetID: "xyz" }) or null for full cleanup.
 * @returns {Promise<Object>} - Result object indicating success or failure.
 */
export default async function removeBacklink(option, object, objectToRemove) {
    const handler = backlinkRegister[option];
    if (handler) return await handler(object, objectToRemove);
    return { success: false, error: `No backlink handler found for ${option}` };
}