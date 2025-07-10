import TeacherModel from "../../models/Teachers.js";
import { teacherSchema } from "../../../lib/validations/teacher.js";

/**
 * Creates a new teacher if not already existing.
 * 
 * @param {{ name: string, code: string, email: string }} teacherInput - Raw teacher object.
 * @returns {Promise<Object>} - Result object with success, data or error.
 */
export default async function createTeacher(teacherInput) {
    try {
        const parsed = teacherSchema.safeParse(teacherInput);

        if (!parsed.success) {
            throw new Error(`Invalid teacher input: ${parsed.error.message}`);
        }

        const validatedTeacher = parsed.data;

        const existingTeacher = await TeacherModel.findOne({ code: validatedTeacher.code });

        if (existingTeacher) {
            throw new Error(`Teacher with code "${validatedTeacher.code}" already exists`);
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
