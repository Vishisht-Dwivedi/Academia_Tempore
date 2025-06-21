import TeacherModel from "../../models/Teachers.js";
import Teacher from "../../constructors/teacherConstructor.js";
import mongoose from "mongoose";
/**
 * Creates a new teacher if not already existing.
 * 
 * @param {name: string, code: string} teacher - Object representing teacher containing name and code.
 * @returns {Promise<Object>} - Result object with success, data or error.
 */
export default async function createTeacher(teacher) {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const validatedTeacher = new Teacher(teacher);

        const existingTeacher = await TeacherModel.findOne({
            code: validatedTeacher.code
        }).session(session);

        if (existingTeacher) {
            throw new Error(`Teacher with code : ${validatedTeacher.code} already exists`);
        }

        const savedTeacher = await new TeacherModel(validatedTeacher).save({ session });
        await session.commitTransaction();
        return {
            success: true,
            data: savedTeacher.toObject(),
        };
    } catch (error) {
        await session.abortTransaction();
        return {
            success: false,
            error: error.message || "Unknown error",
        };
    } finally {
        await session.endSession();
    }
}
