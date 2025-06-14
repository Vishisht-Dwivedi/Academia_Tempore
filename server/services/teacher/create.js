import TeacherModel from "../../models/Teachers.js";
import Teacher from "../../constructors/teacherConstructor.js";

/**
 * Creates a new teacher if not already existing.
 * 
 * @param {[string, string]} teacher - Array containing name and code.
 * @returns {Promise<Object>} - Result object with success, data or error.
 */
export default async function createTeacher(teacher) {
    try {
        const validatedTeacher = new Teacher(teacher);

        const existingTeacher = await TeacherModel.findOne({
            code: validatedTeacher.code
        }).lean();

        if (existingTeacher) {
            return {
                success: false,
                error: `Teacher with code : ${validatedTeacher.code} already exists`,
            };
        }

        const savedTeacher = await new TeacherModel(validatedTeacher).save();

        return {
            success: true,
            data: savedTeacher.toObject(),
        };
    } catch (error) {
        return {
            success: false,
            error: error.message || "Unknown error",
        };
    }
}
