import addClassroomBacklinks from "./addClassroomBacklinks.js";
import addSubjectBacklinks from "./addSubjectBacklinks.js";
import addTeacherBacklinks from "./addTeacherBacklinks.js";

/**
 * Dispatches the appropriate backlink addition handler based on type.
 *
 * @async
 * @function addBacklink
 * @param {string} option - Object type ("Classroom", "Subject", "Teacher").
 * @param {Object} object - The actual document to backlink.
 * @returns {Promise<Object>} Result from the dispatched handler.
 */
const backlinkRegister = {
    Classroom: addClassroomBacklinks,
    Subject: addSubjectBacklinks,
    Teacher: addTeacherBacklinks
};

export default async function addBacklink(option, object) {
    const handler = backlinkRegister[option];
    if (handler) {
        return await handler(object);
    }
    return { success: false, error: `No backlink handler for type "${option}"` };
}
