import Classrooms from "../../constructors/classroomConstructor.js";
import createSchedule from "../schedule/create.js";
import mongoose from "mongoose";
import ClassroomModel from "../../models/Classrooms.js";

/**
 * Creates a classroom document in the database after validating structure and schedule,
 * resolving all referenced teacher and subject ObjectIDs, and preventing duplicates.
 *
 * This function wraps the operation in a MongoDB transaction to ensure atomicity.
 * Schedule validation and per-day slot checks are delegated to the constructor layer.
 *
 * @async
 * @function createClassroom
 * @param {string} room - The name/code of the classroom (e.g., "TC-105").
 * @param {Array<{day: string, slots: Array<Object>}>} schedule - An array of day-wise schedule objects,
 *     where each contains the day and an array of slots.
 *     Each slot must include:
 *     - `slot`: number (1–8),
 *     - `subject`: { name: string, code: string, type: "Theory" | "Lab" },
 *     - `teacher`: { name: string, code: string }
 *
 * @returns {Promise<{ success: boolean, data?: Object, error?: string }>} Result object:
 *     - `success: true` and `data`: inserted document on success,
 *     - `success: false` and `error`: error message on failure
 *
 * @throws {Error} If validation fails or a room with the same name already exists.
 */
export default async function createClassroom(room, schedule) {
    const validatedClassroom = new Classrooms(room, schedule);

    const scheduleToSave = await Promise.all(
        validatedClassroom.schedule.map((daySchedule) =>
            createSchedule(daySchedule)
        )
    );

    const session = await mongoose.startSession();
    try {
        await session.startTransaction();

        const existingRoom = await ClassroomModel.findOne({ room: validatedClassroom.room }).session(session);
        if (existingRoom) {
            throw new Error(`Room : ${room} already exists`);
        }

        const classroomToSave = {
            room: validatedClassroom.room,
            schedule: scheduleToSave
        };

        const savedDoc = await new ClassroomModel(classroomToSave).save({ session });

        await session.commitTransaction();

        return {
            success: true,
            data: savedDoc
        };
    } catch (error) {
        await session.abortTransaction();
        return {
            success: false,
            error: error.message || "Unknown Error occurred"
        };
    } finally {
        await session.endSession();
    }
}
