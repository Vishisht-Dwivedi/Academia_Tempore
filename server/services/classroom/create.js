import Classrooms from "../../constructors/classroomConstructor.js";
import createSchedule from "../schedule/create.js";
import mongoose from "mongoose";
import ClassroomModel from "../../models/Classrooms.js";
import verifyAndLink from "./utils/verifyAndLinkClassroom.js";
import injectRoomId from "./utils/injectRoomId.js";
import stripRoomId from "./utils/stripRoomId.js";

/**
 * Creates a classroom document in the database after validating structure and schedule,
 * resolving all referenced teacher and subject ObjectIDs, and preventing duplicates.
 *
 * @async
 * @function createClassroom
 * @param {string} room - The name/code of the classroom (e.g., "TC-105").
 * @param {Array<{day: string, slots: Array<Object>}>} schedule - An array of day-wise schedule objects,
 *     where each contains the day and an array of slots.
 *     Each slot must include:
 *     - `slot`: number (1–9),
 *     - `subject`: { name, code, type },
 *     - `teacher`: { name, code }
 *
 * @returns {Promise<{ success: boolean, data?: Object, error?: string }>}
 */
export const createClassroom = async (room, schedule) => {
    const validatedClassroom = new Classrooms(room, schedule);
    let session;

    try {
        const scheduleToSave = await Promise.all(
            validatedClassroom.schedule.map((daySchedule) =>
                createSchedule(daySchedule)
            )
        );

        session = await mongoose.startSession();
        session.startTransaction();

        const existingRoom = await ClassroomModel.findOne({ room: validatedClassroom.room }).session(session);
        if (existingRoom) {
            throw new Error(`Room "${room}" already exists`);
        }

        const classroomDoc = new ClassroomModel({
            room: validatedClassroom.room,
            schedule: scheduleToSave,
        });

        const savedDoc = await classroomDoc.save({ session });

        const scheduleWithRoom = injectRoomId(scheduleToSave, savedDoc._id);

        await verifyAndLink(scheduleWithRoom);

        await session.commitTransaction();

        return {
            success: true,
            data: savedDoc,
        };
    } catch (error) {
        if (session) {
            await session.abortTransaction();
        }

        console.error("Error in createClassroom:", error);
        return {
            success: false,
            error: error.message || "Unknown error occurred during classroom creation",
        };
    } finally {
        if (session) session.endSession();
    }
}

export const createClassroomByRoom = async (room) => {
    const validatedRoom = room.trim().toUpperCase();
    try {
        const existingRoom = await ClassroomModel.findOne({ room });
        if (existingRoom) throw new Error(`Room with code: ${room} already exists`);
        const roomToSave = new ClassroomModel({
            room: validatedRoom
        })
        const roomDoc = await roomToSave.save();
        return {
            success: true,
            data: roomDoc
        }
    } catch (error) {
        return {
            success: false,
            error
        }
    }

}