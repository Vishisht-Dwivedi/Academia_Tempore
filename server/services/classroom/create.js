import mongoose from "mongoose";
import ClassroomModel from "../../models/Classrooms.js";
import createSchedule from "../schedule/create.js";
import verifyAndLink from "./utils/verifyAndLinkClassroom.js";
import injectRoomId from "./utils/injectRoomId.js";
import { classroomSchema } from "../../../lib/validations/classroom.js";

/**
 * Creates a classroom document with validated schedule and resolved ObjectIDs.
 *
 * @param {string} room - The classroom identifier (e.g., "TC-105").
 * @param {Array<Object>} schedule - Array of daily schedules with nested slots.
 * @returns {Promise<{ success: boolean, data?: Object, error?: string }>}
 */
export const createClassroom = async (room, schedule) => {
    let validated;
    let session;

    try {
        const parsed = classroomSchema.safeParse({ room, schedule });
        if (!parsed.success) throw new Error(parsed.error.message);

        validated = parsed.data;

        const scheduleToSave = await Promise.all(
            (validated.schedule || []).map((daySchedule) => createSchedule(daySchedule))
        );

        session = await mongoose.startSession();
        session.startTransaction();

        const existingRoom = await ClassroomModel.findOne({ room: validated.room }).session(session);
        if (existingRoom) throw new Error(`Room "${validated.room}" already exists`);

        const classroomDoc = new ClassroomModel({
            room: validated.room,
            schedule: scheduleToSave,
        });

        const savedDoc = await classroomDoc.save({ session });

        const scheduleWithRoom = injectRoomId(scheduleToSave, savedDoc._id);
        await verifyAndLink(scheduleWithRoom);

        await session.commitTransaction();

        return { success: true, data: savedDoc };
    } catch (error) {
        if (session) await session.abortTransaction();
        return { success: false, error: error.message || "Unknown error during classroom creation" };
    } finally {
        if (session) session.endSession();
    }
};
export const createClassroomByRoom = async (room) => {
    try {
        const parsed = classroomSchema.safeParse({ room });
        if (!parsed.success) throw new Error(parsed.error.message);

        const validated = parsed.data;

        const existingRoom = await ClassroomModel.findOne({ room: validated.room });
        if (existingRoom) throw new Error(`Room "${validated.room}" already exists`);

        const roomDoc = await new ClassroomModel({ room: validated.room }).save();
        return { success: true, data: roomDoc };
    } catch (error) {
        return { success: false, error: error.message || "Error creating classroom by room" };
    }
};
