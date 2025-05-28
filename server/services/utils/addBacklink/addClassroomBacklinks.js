import TeacherModel from "../../../models/Teachers.js";
import SubjectModel from "../../../models/Subjects.js";
import mongoose from "mongoose";

/**
 * Adds backlink references to teachers and subjects from a classroom's schedule.
 *
 * @async
 * @function addClassroomBacklinks
 * @param {Object} classroom - The classroom document.
 * @param {string} classroom._id - The ID of the classroom.
 * @param {Array} classroom.schedule - Array of day-wise schedules.
 * @returns {Promise<Object>} Result object with success status.
 */
export default async function addClassroomBacklinks(classroom) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { _id, schedule = [] } = classroom;

        for (const day of schedule) {
            for (const slot of day.slots) {
                await TeacherModel.findByIdAndUpdate(
                    slot.teacher,
                    { $addToSet: { classes: _id, subjects: slot.subject } },
                    { session }
                );
                await SubjectModel.findByIdAndUpdate(
                    slot.subject,
                    { $addToSet: { teachers: slot.teacher } },
                    { session }
                );
            }
        }

        await session.commitTransaction();
        return { success: true };
    } catch (error) {
        await session.abortTransaction();
        console.error("Error in addClassroomBacklinks:", error);
        return { success: false, error };
    } finally {
        session.endSession();
    }
}
