import mongoose from "mongoose";
import ClassroomModel from "../../models/Classrooms.js";
import Classrooms from "../../constructors/classroomConstructor.js";
import createSchedule from "./createSchedule.js";
import addBacklink from "../utils/addBacklink/index.js";
import checkClassroomCollision from "../utils/checkCollisions/checkClassroomCollision.js";
import removeBacklink from "../utils/removeBacklink/index.js";
import parseTeachersFromClassroom from "../utils/checkCollisions/parseTeachersFromClassroom.js";
/**
 * Checks whether adding the classroom causes any teacher schedule collisions.
 * - Builds teacher-wise schedule from the classroom’s data.
 * - Validates each teacher's combined schedule for conflicts.
 *
 * @async
 * @function checkClassroomCollision
 * @param {Object} classroom - The classroom document (after population).
 * @param {string} classroom.room - The room code.
 * @param {Array<Object>} classroom.schedule - Populated schedule containing slots and linked teachers.
 * @returns {Promise<boolean>} Returns {status:true, classroom: savedDoc} if no collision; otherwise {status: false, classroom: presaveDoc, error} and unsaves the classroom.
 */
export default async function createClassroom({ room, schedule }) {
    const existingRoom = await ClassroomModel.findOne({ room });
    if (existingRoom) throw new Error(`Room with room code: ${room} already exists`);

    const classroom = new Classrooms(room, schedule);
    const scheduleToSave = await Promise.all(
        classroom.schedule.map(({ day, slots }) => createSchedule(day, slots))
    );

    const classroomToSave = {
        room: classroom.room,
        schedule: scheduleToSave
    };
    try {
        const savedClassroom = await new ClassroomModel(classroomToSave).save();
        await savedClassroom.populate("schedule.slots.teacher", "code");

        await addBacklink("Classroom", savedClassroom);

        const collisionResult = await checkClassroomCollision(savedClassroom);

        if (collisionResult.status) {
            console.log("saved here");
            return {
                status: "OK",
                classroom: savedClassroom
            };
        } else {
            // Parse teacher IDs from schedule
            const { teacherIDs } = parseTeachersFromClassroom(savedClassroom.schedule);
            //iterate through the map.. for each entry destructure code and id and then use id
            for (const [_, teacherId] of teacherIDs.entries()) {
                const state = await removeBacklink("Teacher", { _id: teacherId }, { type: "classroom", targetID: savedClassroom._id });
                if (!state.success) console.log(state.error);
            }
            console.log("Deleted here");
            await ClassroomModel.findByIdAndDelete(savedClassroom._id);

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
