import TeacherModel from "../../models/Teachers.js";
import Teacher from "../../constructors/teacherConstructor.js"
import codeToID from "../utils/codesToID/index.js";
import removeBacklink from "../utils/removeBacklink/index.js";
import addBacklink from "../utils/addBacklink/index.js";
/**
 * Updates a teacher document by validating and converting class and subject codes,
 * managing backlink removals for obsolete class and subject references,
 * updating the teacher record in the database, and adding backlinks for new references.
 *
 * @async
 * @function updateTeacher
 * 
 * @param {Object} teacherObj - The teacher data object to update.
 * @param {import('mongoose').Types.ObjectId | string} teacherObj._id - The unique identifier of the teacher document.
 * @param {string} teacherObj.name - The name of the teacher.
 * @param {string} teacherObj.code - The unique code for the teacher.
 * @param {string[]} [teacherObj.subjects=[]] - Array of subject codes associated with the teacher.
 * @param {string[]} [teacherObj.classes=[]] - Array of classroom codes associated with the teacher.
 *
 * @throws {Error} Throws an error if the teacher with the given `_id` is not found in the database.
 *
 * @returns {Promise<Object>} Returns a Promise resolving to the updated teacher document.
 */
export default async function updateTeacher(teacherObj) {
    const { _id, name, code, subjects = [], classes = [] } = teacherObj;
    const validatedTeacher = new Teacher(name, code, classes, subjects);
    const convertedClassCodes = await codeToID("Classroom", validatedTeacher.classes.map((c) => c.room));
    const convertedSubjectCodes = await codeToID("Subject", subjects);
    const teacherToSave = {
        name: validatedTeacher.name,
        code: validatedTeacher.code,
        classes: convertedClassCodes,
        subjects: convertedSubjectCodes
    }
    const existingTeacherDoc = await TeacherModel.findById(_id).lean();
    // Create sets of new IDs (after update)
    const newClassesSet = new Set(teacherToSave.classes.map(c => c.toString()));
    const newSubjectsSet = new Set(teacherToSave.subjects.map(s => s.toString()));
    for (const oldClass of existingTeacherDoc.classes) {
        const oldClassStr = oldClass.toString();
        if (!newClassesSet.has(oldClassStr)) {
            await removeBacklink("Teacher", _id, { type: "classroom", targetID: oldClass });
        }
    }
    for (const oldSubject of existingTeacherDoc.subjects) {
        const oldSubjectStr = oldSubject.toString();
        if (!newSubjectsSet.has(oldSubjectStr)) {
            await removeBacklink("Teacher", _id, { type: "subject", targetID: oldSubject });
        }
    }

    const savedTeacher = await TeacherModel.findByIdAndUpdate(_id, teacherToSave, { new: true });
    await addBacklink("Teacher", savedTeacher);
    return savedTeacher;
}