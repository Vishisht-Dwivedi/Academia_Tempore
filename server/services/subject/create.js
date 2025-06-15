import SubjectModel from "../../models/Subjects.js";
import Subject from "../../constructors/subjectConstructor.js";
import mongoose from "mongoose";

/**
 * Creates and saves a new subject to the database after validation.
 *
 * @async
 * @function createSubject
 * @param {Object<string> {name, code, type}} subject - An object of subject attributes: name, code, type.
 * @returns {Promise<Object>} A result object containing the operation's status.
 * 
 * @property {boolean} success - Whether the operation succeeded or failed.
 * @property {Object} [data] - The saved subject object, if creation was successful.
 * @property {string} [error] - Error message if the operation failed.
 *
 * @throws {Error} If constructor validation fails or a database error occurs.
 *
 */
export default async function createSubject(subject) {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const validatedSubject = new Subject(subject);

        const existingSubject = await SubjectModel.findOne({
            code: validatedSubject.code,
            type: validatedSubject.type
        }).session(session);

        if (existingSubject) {
            await session.abortTransaction();
            return {
                success: false,
                error: `Subject with code: ${validatedSubject.code} and type: ${validatedSubject.type} already exists`,
            };
        }

        const savedSubject = await new SubjectModel(validatedSubject).save({ session });
        await session.commitTransaction();
        return {
            success: true,
            data: savedSubject.toObject(),
        };
    } catch (error) {
        await session.abortTransaction();
        return {
            success: false,
            error: error.message || "Unknown error",
        };
    } finally {
        session.endSession();
    }
}
