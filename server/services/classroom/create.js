import mongoose from "mongoose";
import ClassroomModel from "../../models/Classrooms.js";
import { classroomSchema } from "../../../lib/validations/classroom.js";

/**
 * Creates a classroom document with validated schedule and resolved ObjectIDs.
 *
 * @param {string} room - The classroom identifier (e.g., "TC-105").
 * @param {Array<Object>} schedule - Array of daily schedules with nested slots.
 * @returns {Promise<{ success: boolean, data?: Object, error?: string }>}
 */
export const createClassroom = async (room) => {
    let validated;
    let session;

    try {
        const parsed = classroomSchema.safeParse({ room });
        if (!parsed.success) throw new Error(parsed.error.message);

        validated = parsed.data;

        session = await mongoose.startSession();
        session.startTransaction();

        const existingRoom = await ClassroomModel.findOne({ room: validated.room }).session(session);
        if (existingRoom) throw new Error(`Room "${validated.room}" already exists`);

        const classroomDoc = new ClassroomModel({
            room: validated.room
        });

        const savedDoc = await classroomDoc.save({ session });
        await session.commitTransaction();
        return { success: true, data: savedDoc };
    } catch (error) {
        if (session) await session.abortTransaction();
        return { success: false, error: error.message || "Unknown error during classroom creation" };
    } finally {
        if (session) session.endSession();
    }
};