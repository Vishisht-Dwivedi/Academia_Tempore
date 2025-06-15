import TeacherModel from "../../../models/Teachers.js";
import Teacher from "../../../constructors/teacherConstructor.js";
import createTeacher from "../../teacher/create.js";
/**
 * Retrieves the `_id` of a teacher from the database using the provided teacher details.
 * If the teacher does not exist, it creates a new entry and then returns the `_id`.
 *
 * @async
 * @function teacherToID
 * @param {Object} teacher - An object representing the teacher.
 * @param {string} teacher.name - The full name of the teacher.
 * @param {string} teacher.code - The unique code identifying the teacher.
 *
 * @returns {Promise<string>} The MongoDB ObjectId (`_id`) of the existing or newly created teacher.
 *
 * @throws {Error} If teacher creation fails or input is invalid.
 */

export default async function teacherToID(teacher) {
    const validatedTeacher = new Teacher(teacher);
    let TeacherDoc = await TeacherModel.findOne({ code: validatedTeacher.code }).lean();
    if (!TeacherDoc) {
        const createdTeacher = await createTeacher(validatedTeacher);
        if (!createdTeacher.success) {
            throw new Error(`Failed to create teacher with code: ${teacher.code}`);
        }
        TeacherDoc = createdTeacher.data;
    }
    return TeacherDoc._id;
}