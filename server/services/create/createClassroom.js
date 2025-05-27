import ClassroomModel from "../../models/Classrooms.js";
import Classrooms from "../../constructors/classroomConstructor.js";
import createSchedule from "./createSchedule.js";
import addBacklink from "../utils/addBacklink/index.js";
import checkTeacherCollision from "../utils/checkCollisions/checkTeacherCollisions.js";
export default async function createClassroom({ room, schedule }) {
    const existingRoom = await ClassroomModel.findOne({ room });
    if (existingRoom) throw new Error(`Room with room code: ${room} already exists`);

    const classroom = new Classrooms(room, schedule);

    const scheduleToSave = await Promise.all(
        classroom.schedule.map(schedule => createSchedule(schedule.day, schedule.slots))
    );

    const classroomToSave = {
        room: classroom.room,
        schedule: scheduleToSave
    };

    const savedClassroom = await (await new ClassroomModel(classroomToSave).save())
        .populate("schedule.slots.teacher", "code");
    await addBacklink("Classroom", savedClassroom);
    await checkTeacherCollision(savedClassroom);
    return savedClassroom;
}
