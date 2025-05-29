import classroomCodeToID from "./classroomCodeToID.js";
import subjectCodesToID from "./subjectCodesToID.js";
import teacherCodeToID from "./teacherCodesToID.js";

/**
 * A registry mapping model names to their respective code-to-ID conversion functions.
 * @type {Object.<string, function>}
 */
const codeToIDRegister = {
    Classroom: classroomCodeToID,
    Subject: subjectCodesToID,
    Teacher: teacherCodeToID
};

/**
 * Converts an array of codes or identifier objects to their corresponding MongoDB ObjectIDs,
 * based on the provided model name (e.g., "Teacher", "Subject", "Classroom").
 *
 * @async
 * @function
 * @param {"Teacher" | "Subject" | "Classroom"} option - The name of the entity type to convert.
 * @param {string[] | Object[]} array - The array of codes (for Teachers and Classrooms)
 *                                      or objects with identifying properties (for Subjects).
 * @returns {Promise<ObjectId[]>} A promise that resolves to an array of ObjectIDs.
 *
 * @throws {Error} If the specified option does not exist in the registry or if a code cannot be resolved.
 *
 * @example
 * const teacherIds = await codeToID("Teacher", ["RK", "RC"]);
 * const subjectIds = await codeToID("Subject", [{ code: "dbms", type: "theory" }]);
 * const classIds = await codeToID("Classroom", ["TC-102", "TC-204"]);
 */
export default async function codeToID(option, array) {
    const handler = codeToIDRegister[option];
    if (handler) {
        return await handler(array);
    } else {
        throw new Error(`Invalid option '${option}'. Valid options: Teacher, Subject, Classroom`);
    }
}
