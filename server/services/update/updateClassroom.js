import mongoose from "mongoose";
import ClassroomModel from "../../models/Classrooms.js";
import Classrooms from "../../constructors/classroomConstructor.js";
import createSchedule from "../utils/createSchedule/index.js";
import addBacklink from "../utils/addBacklink/index.js";
import removeBacklink from "../utils/removeBacklink/index.js";
import checkClassroomCollision from "../collisions/checkClassroomCollision.js";
import parseTeachersFromClassroom from "../utils/parseTeachersFromClassroom.js";

/**
 * Updates an existing classroom document in the database.
 * 
 * Steps:
 * - Validates the input.
 * - Generates the full schedule structure.
 * - Replaces the existing document with the updated one.
 * - Checks for scheduling collisions.
 * - If collision found, removes backlinks and reverts the update.
 * 
 * @async
 * @function updateClassroom
 * 
 * @param {Object} classroom - Classroom data to update.
 * @param {string | import('mongoose').Types.ObjectId} classroom._id - The classroom's unique ID.
 * @param {string} classroom.room - The unique room code (e.g., "CSE-101").
 * @param {Array} classroom.schedule - Array of days with slot data.
 * 
 * @returns {Promise<Object>} An object with status and updated classroom.
 * - If success: `{ status: "OK", classroom }`
 * - If collision: `{ status: "Collision", message, classroom }`
 * 
 * @throws Will throw if DB operations fail or classroom doesn't exist.
 */
export default async function updateClassroom(classroom) {
    const { _id, room, schedule } = classroom;

    const validatedRoom = new Classrooms(room, schedule);
    const scheduleToSave = await Promise.all(
        validatedRoom.schedule.map(({ day, slots }) => createSchedule(day, slots))
    );

    const classroomToSave = {
        room: validatedRoom.room,
        schedule: scheduleToSave
    };


    try {
        const existingClassroom = await ClassroomModel.findById(_id);
        if (!existingClassroom) throw new Error(`Classroom with ID ${_id} not found`);

        // removing old backlinks before overwriting
        await removeBacklink("Classroom", _id);

        // Update the classroom document in place
        existingClassroom.room = classroomToSave.room;
        existingClassroom.schedule = classroomToSave.schedule;
        const savedClassroom = existingClassroom;

        await savedClassroom.populate("schedule.slots.teacher", "code");
        await addBacklink("Classroom", savedClassroom);

        // Collision check
        const collisionResult = await checkClassroomCollision(savedClassroom);
        if (collisionResult.status) {
            return { status: "OK", classroom: savedClassroom };
        } else {
            // Cleanup if collision happens
            const { teacherIDs } = parseTeachersFromClassroom(savedClassroom.schedule);
            for (const [_, teacherId] of teacherIDs.entries()) {
                const state = await removeBacklink("Teacher", { _id: teacherId }, { type: "classroom", targetID: savedClassroom._id });
                if (!state.success) console.log(state.error);
            }

            await ClassroomModel.findByIdAndUpdate(_id, { schedule: [] });

            return {
                status: "Collision",
                message: collisionResult.error,
                classroom: classroomToSave
            };
        }
    } catch (error) {
        throw error;
    }
}
