import mongoose from "mongoose";
import ScheduleSchema from "./Schedule.js";
import { TeacherModel } from "./Teachers.js";
const Schema = mongoose.Schema;

//Declaring Schemas and models
const ClassroomsSchema = new Schema({
    room: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    schedule: {
        Monday: { type: [ScheduleSchema], default: [] },
        Tuesday: { type: [ScheduleSchema], default: [] },
        Wednesday: { type: [ScheduleSchema], default: [] },
        Thursday: { type: [ScheduleSchema], default: [] },
        Friday: { type: [ScheduleSchema], default: [] }
    }
});
const ClassroomsModel = mongoose.model("Classroom", ClassroomsSchema);



// Add
const addNewClassroom = async ({ room, schedule }) => {
    const existingClassroom = await ClassroomsModel.findOne({ room });
    if (existingClassroom) return existingClassroom;

    const newClassroom = new ClassroomsModel({ room, schedule });
    await newClassroom.save();

    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const teacherIds = new Set(); //unique

    weekdays.forEach(day => {
        (schedule[day] || []).forEach(slot => {
            if (slot.teacher) {
                teacherIds.add(slot.teacher.toString());
            }
        });
    });

    for (const teacherId of teacherIds) {
        await TeacherModel.findByIdAndUpdate(
            teacherId,
            { $addToSet: { classes: newClassroom._id } }
        );
    }

    return newClassroom;
};
//Get
const getAllClassrooms = async () => {
    return await ClassroomsModel.find({});
};
const getClassroom = async (room) => {
    return await ClassroomsModel.findOne({ room });
}
const getClassroomScheduleById = async (_id) => {
    return await ClassroomsModel.findOne({ _id });
}
//export
export { addNewClassroom, getAllClassrooms, getClassroom, getClassroomScheduleById };
