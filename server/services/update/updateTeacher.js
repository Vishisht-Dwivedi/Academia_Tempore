import TeacherModel from "../../models/Teachers";
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
    const convertedClassCodes = await codeToID("Classroom", validatedTeacher.classes);
    const convertedSubjectCodes = await codeToID("Subject", subjects);
    const teacherToSave = {
        name: validatedTeacher.name,
        code: validatedTeacher.code,
        classes: convertedClassCodes,
        subjects: convertedSubjectCodes
    }
    const existingTeacherDoc = await TeacherModel.findById(_id).lean();

    // creating set of ids as strings for fast lookup
    const existingClassesSet = new Set(
        existingTeacherDoc.classes.map(c => c.toString())
    );
    const existingSubjectSet = new Set(
        existingTeacherDoc.subjects.map(c => c.toString())
    );
    // Collect promises for adding/removing backlinks
    const classRemovalPromises = [];
    for (const room of teacherToSave.classes) {
        const roomStr = room.toString();
        if (!existingClassesSet.has(roomStr)) {
            classRemovalPromises.push(
                removeBacklink("Teacher", _id, { type: "classroom", targetID: room })
            );
        }
    }
    // Collect promises for adding/removing backlinks
    const subjectRemovalPromises = [];
    for (const subject of teacherToSave.subjects) {
        const subjectStr = subject.toString();
        if (!existingSubjectSet.has(subjectStr)) {
            subjectRemovalPromises.push(
                removeBacklink("Teacher", _id, { type: "subject", targetID: subject })
            );
        }
    }
    // Run all removeBacklink calls concurrently
    await Promise.all(classRemovalPromises);
    await Promise.all(subjectRemovalPromises);
    const savedTeacher = await TeacherModel.findByIdAndUpdate(_id, teacherToSave, { new: true });
    await addBacklink("Teacher", savedTeacher);
    return savedTeacher;
}