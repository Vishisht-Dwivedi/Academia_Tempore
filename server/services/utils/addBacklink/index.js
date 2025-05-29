// addBacklink.js

import addClassroomBacklinks from "./addClassroomBacklinks.js";
import addSubjectBacklinks from "./addSubjectBacklinks.js";
import addTeacherBacklinks from "./addTeacherBacklinks.js";

/**
 * Dispatches the appropriate backlink addition handler based on the given type.
 *
 * @async
 * @function addBacklink
 * @param {"Classroom"|"Subject"|"Teacher"} option - The object type to add backlinks for.
 * @param {Object} object - The actual document object to process backlinks for.
 * @returns {Promise<Object>} Result from the dispatched handler.
 */
const backlinkRegister = {
    Classroom: addClassroomBacklinks,
    Subject: addSubjectBacklinks,
    Teacher: addTeacherBacklinks,
};
/**
 * Dispatches and executes the appropriate backlink addition handler based on the specified object type.
 * 
 * This function acts as a centralized router that delegates backlink addition logic to
 * type-specific handler functions for "Classroom", "Subject", and "Teacher" objects.
 * 
 * @async
 * @function addBacklink
 * 
 * @param {string} option - The type of object to process backlinks for. 
 *                          Must be one of: "Classroom", "Subject", or "Teacher".
 * @param {Object} object - The document object containing the data required by the backlink handler.
 *                          The expected shape depends on the `option` parameter.
 * 
 * @returns {Promise<Object>} A Promise that resolves to the result object from the invoked handler.
 *                            The object typically includes a `success` boolean and optionally an `error` property.
 * 
 * @throws {Error} Throws if an unsupported `option` is provided.
 *                 (Alternatively, returns a failure object if no handler matches the option.)
 * 
 * @example
 * // Add backlinks for a teacher document
 * const result = await addBacklink("Teacher", teacherDoc);
 * if (!result.success) {
 *   console.error("Backlink addition failed:", result.error);
 * }
 */

export default async function addBacklink(option, object) {
    const handler = backlinkRegister[option];
    if (handler) {
        return await handler(object);
    }
    return { success: false, error: `No backlink handler for type "${option}"` };
}
