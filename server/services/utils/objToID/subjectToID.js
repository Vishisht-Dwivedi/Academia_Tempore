import SubjectModel from "../../../models/Subjects.js";
import Subject from "../../../constructors/subjectConstructor.js";
import createSubject from "../../subject/create.js";
/**
 * Retrieves the `_id` of a subject from the database using the provided subject details.
 * If the subject does not exist, it creates a new entry and then returns the `_id`.
 *
 * @async
 * @function subjectToID
 * @param {Object} subject - An object representing the subject.
 * @param {string} subject.name - The full name of the subject.
 * @param {string} subject.code - The unique code identifying the subject.
 * @param {string} subject.type - The type: [theory, lab] identifying the subject.

 * @returns {Promise<string>} The MongoDB ObjectId (`_id`) of the existing or newly created subject.
 *
 * @throws {Error} If subject creation fails or input is invalid.
 */

export default async function subjectToID(subject) {
    const validatedSubject = new Subject(subject);
    let SubjectDoc = await SubjectModel.findOne({ code: validatedSubject.code, type: validatedSubject.type }).lean();
    if (!SubjectDoc) {
        const createdSubject = await createSubject(validatedSubject);
        if (!createdSubject.success) {
            throw new Error(`Failed to create subject with code: ${subject.code}`);
        }
        SubjectDoc = createdSubject.data;
    }
    return SubjectDoc._id;
}