import SubjectModel from "../../../models/Subjects.js";

/**
 * Converts an array of subject descriptors (each with `code` and `type`) to their corresponding MongoDB ObjectIDs.
 *
 * @async
 * @function
 * @param {{code: string, type: string}[]} subjectArr - Array of subject objects with `code` and `type` properties.
 * @returns {Promise<ObjectId[]>} A promise that resolves to an array of ObjectIDs for the matching subjects.
 *
 * @throws {Error} If any subject with the given code and type is not found in the database.
 *
 * @example
 * const subjectIds = await subjectCodesToID([
 *   { code: "dbms", type: "theory" },
 *   { code: "coa", type: "lab" }
 * ]);
 * // Output: [ObjectId("..."), ObjectId("...")]
 */
export default async function subjectCodesToID(subjectArr) {
    const subjectIds = await Promise.all(
        subjectArr.map(async (subject) => {
            const subjectDoc = await SubjectModel.findOne(subject);
            if (!subjectDoc) {
                throw new Error(`Subject with code '${subject.code}' and type '${subject.type}' not found`);
            }
            return subjectDoc._id;
        })
    );
    return subjectIds;
}
