// addSubjectBacklinks.js

import TeacherModel from "../../../models/Teachers.js";
import mongoose from "mongoose";

/**
 * Adds backlink references to teachers from a subject document.
 *
 * @async
 * @function addSubjectBacklinks
 * @param {Object} subject - The subject document.
 * @param {import('mongoose').Types.ObjectId|string} subject._id - Subject ID.
 * @param {Array<import('mongoose').Types.ObjectId|string>} subject.teachers - Array of teacher IDs.
 * @returns {Promise<Object>} Result object with success status and possible error.
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
