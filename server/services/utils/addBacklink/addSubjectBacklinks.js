import TeacherModel from "../../../models/Teachers.js";
import mongoose from "mongoose";

/**
 * Adds backlink references to teachers from a subject.
 *
 * @async
 * @function addSubjectBacklinks
 * @param {Object} subject - The subject document.
 * @param {string} subject._id - The ID of the subject.
 * @param {string[]} subject.teachers - Array of teacher IDs.
 * @returns {Promise<Object>} Result object with success status.
 */
export default async function addSubjectBacklinks(subject) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { _id, teachers = [] } = subject;
        await TeacherModel.updateMany(
            { _id: { $in: teachers } },
            { $addToSet: { subjects: _id } },
            { session }
        );

        await session.commitTransaction();
        return { success: true };
    } catch (error) {
        await session.abortTransaction();
        console.error("Error in addSubjectBacklinks:", error);
        return { success: false, error };
    } finally {
        session.endSession();
    }
}
