import ClassroomModel from "../../models/Classrooms.js";
import Classrooms from "../../constructors/classroomConstructor.js";
import createSchedule from "./createSchedule.js";
import TeacherModel from "../../models/Teachers.js";

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

    const savedClassroom = await new ClassroomModel(classroomToSave).save();

    // backlink to teachers 
    for (const schedule of savedClassroom.schedule) {
        for (const slot of schedule.slots) {
            await TeacherModel.findByIdAndUpdate(
                slot.teacher,
                { $addToSet: { classes: savedClassroom._id } }
            );
        }
    }

    return savedClassroom;
}
