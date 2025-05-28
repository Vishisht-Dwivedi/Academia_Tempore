import SubjectModel from "../../../models/Subjects.js";
import ClassroomModel from "../../../models/Classrooms.js";
import mongoose from "mongoose";

/**
 * Adds backlink references to subjects and classrooms from a teacher.
 *
 * @async
 * @function addTeacherBacklinks
 * @param {Object} teacher - The teacher document.
 * @param {string} teacher._id - The ID of the teacher.
 * @param {string[]} teacher.subjects - List of subject IDs.
 * @param {string[]} teacher.classes - List of classroom IDs.
 * @returns {Promise<Object>} Result object with success status.
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
