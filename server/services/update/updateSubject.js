import SubjectModel from "../../models/Subjects.js";
import TeacherModel from "../../models/Teachers.js";
import Subject from "../../constructors/subjectConstructor.js";
import codeToID from "../utils/codesToID/index.js";
import removeBacklink from "../utils/removeBacklink/index.js";
import addBacklink from "../utils/addBacklink/index.js";

/**
 * Updates a subject document in the database.
 *
 * This function:
 * 1. Validates and converts the subject input.
 * 2. Converts teacher codes to ObjectIds.
 * 3. Removes backlinks from teachers no longer associated with the subject.
 *    Also removes backlinks from classrooms that had the subject-teacher combo.
 * 4. Updates the subject document in the database.
 * 5. Adds backlinks for newly associated teachers.
 *
 * @async
 * @function updateSubject
 * 
 * @param {Object} subject - The subject data object to update.
 * @param {import("mongoose").Types.ObjectId | string} subject._id - The unique identifier of the subject document.
 * @param {string} subject.name - Name of the subject.
 * @param {string} subject.code - Unique code for the subject.
 * @param {string} subject.type - Type of the subject (e.g., elective, core).
 * @param {string[]} [subject.teachers=[]] - Array of teacher codes associated with this subject.
 *
 * @throws {Error} Throws an error if the subject is not found or update fails.
 *
 * @returns {Promise<Object>} The updated subject document from the database.
 */
export default async function updateSubject(subject) {
    const { _id, name, code, type, teachers = [] } = subject;
    const validatedSubject = new Subject(name, code, type, teachers);
    const convertedTeacherIDs = await codeToID("Teacher", teachers);

    const subjectToSave = {
        name: validatedSubject.name,
        code: validatedSubject.code,
        type: validatedSubject.type,
        teachers: convertedTeacherIDs
    };

    const existingSubjectDoc = await SubjectModel.findById(_id).lean();
    if (!existingSubjectDoc) {
        throw new Error(`Subject with ID ${_id} not found.`);
    }
    const newTeachersSet = new Set(convertedTeacherIDs.map(t => t.toString()));
    for (const oldTeacher of existingSubjectDoc.teachers) {
        const oldTeacherStr = oldTeacher.toString();
        if (!newTeachersSet.has(oldTeacherStr)) {
            const oldTeacherDoc = await TeacherModel.findById(oldTeacher).lean();
            const oldTeacherClassrooms = oldTeacherDoc?.classes || [];
            // assumes that within one classroom.. only one teacher teaches that subject
            for (const classRoom of oldTeacherClassrooms) {
                await removeBacklink("Subject", _id, {
                    type: "classroom",
                    targetID: classRoom
                });
            }

            await removeBacklink("Subject", _id, {
                type: "teacher",
                targetID: oldTeacher
            });
        }
    }

    const savedSubject = await SubjectModel.findByIdAndUpdate(_id, subjectToSave, { new: true });
    if (!savedSubject) {
        throw new Error("Failed to update subject.");
    }

    await addBacklink("Subject", savedSubject);
    return savedSubject;
}
