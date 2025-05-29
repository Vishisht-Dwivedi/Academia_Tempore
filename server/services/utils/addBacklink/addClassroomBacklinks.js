// addClassroomBacklinks.js

import TeacherModel from "../../../models/Teachers.js";
import SubjectModel from "../../../models/Subjects.js";
import mongoose from "mongoose";

/**
 * Adds backlink references to teachers and subjects from a classroom's schedule.
 *
 * @async
 * @function addClassroomBacklinks
 * @param {Object} classroom - The classroom document.
 * @param {import('mongoose').Types.ObjectId|string} classroom._id - Classroom ID.
 * @param {Array<{slots: Array<{teacher: import('mongoose').Types.ObjectId|string, subject: import('mongoose').Types.ObjectId|string}>}>} classroom.schedule - Schedule array with day-wise slots.
 * @returns {Promise<Object>} Result object with success status and possible error.
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
