import ClassroomModel from "../../models/Classrooms.js";
import Classrooms from "../../constructors/classroomConstructor.js";
import createSchedule from "./createSchedule.js";

export default async function createClassroom(room, daySchedules) {
    const existingRoom = await ClassroomModel.findOne({ room });
    if (existingRoom) throw new Error(`Room with room code: ${room} already exists`);

    const classroom = new Classrooms(room, daySchedules);

    const scheduleToSave = await Promise.all(
        classroom.schedule.map(schedule => createSchedule(schedule.day, schedule.slots))
    );

    const classroomToSave = {
        room: classroom.room,
        schedule: scheduleToSave
    };

    const savedClassroom = await new ClassroomModel(classroomToSave).save();
    return savedClassroom;
}
