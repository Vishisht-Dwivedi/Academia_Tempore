// addTeacherBacklinks.js

import SubjectModel from "../../../models/Subjects.js";
import ClassroomModel from "../../../models/Classrooms.js";
import mongoose from "mongoose";

/**
 * Adds backlink references to subjects and classrooms from a teacher document.
 *
 * @async
 * @function addTeacherBacklinks
 * @param {Object} teacher - The teacher document.
 * @param {import('mongoose').Types.ObjectId|string} teacher._id - Teacher ID.
 * @param {Array<import('mongoose').Types.ObjectId|string>} teacher.subjects - Array of subject IDs.
 * @param {Array<import('mongoose').Types.ObjectId|string>} teacher.classes - Array of classroom IDs.
 * @returns {Promise<Object>} Result object with success status and possible error.
 */
export default async function addTeacherBacklinks(teacher) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { _id, classes = [], subjects = [] } = teacher;

        await SubjectModel.updateMany(
            { _id: { $in: subjects } },
            { $addToSet: { teachers: _id } },
            { session }
        );

        await ClassroomModel.updateMany(
            { _id: { $in: classes } },
            { $addToSet: { teachers: _id } },
            { session }
        );

        await session.commitTransaction();
        return { success: true };
    } catch (error) {
        await session.abortTransaction();
        console.error("Error in addTeacherBacklinks:", error);
        return { success: false, error };
    } finally {
        session.endSession();
    }
}
