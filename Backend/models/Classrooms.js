import mongoose from "mongoose";
import ScheduleSchema from "./Schedule.js";
import { TeacherModel } from "./Teachers.js";

const Schema = mongoose.Schema;
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Classroom schema
const ClassroomsSchema = new Schema({
    room: {
        type: String,
        unique: true,
        index: true,
        required: true,
    },
    schedule: {
        Monday: { type: ScheduleSchema, default: {} },
        Tuesday: { type: ScheduleSchema, default: {} },
        Wednesday: { type: ScheduleSchema, default: {} },
        Thursday: { type: ScheduleSchema, default: {} },
        Friday: { type: ScheduleSchema, default: {} },
    },
});

const ClassroomsModel = mongoose.model("Classroom", ClassroomsSchema);

// Collision detection
const checkForClashes = async (schedule) => {
    for (const day of weekdays) {
        const daySchedule = schedule[day] || {};

        for (const slot in daySchedule) {
            const lecture = daySchedule[slot];
            if (!lecture || !lecture.teacher) continue;

            const teacher = await TeacherModel.findById(lecture.teacher).populate("classes");
            if (!teacher) throw new Error(`Teacher not found: ${lecture.teacher}`);

            for (const classRef of teacher.classes) {
                const otherClass = await ClassroomsModel.findById(classRef._id);
                if (!otherClass?.schedule?.[day]) continue;

                const otherLecture = otherClass.schedule[day]?.[slot];
                if (otherLecture && String(otherLecture.teacher) === String(lecture.teacher)) {
                    throw new Error(
                        `Clash detected: Teacher ${teacher.name} already assigned at slot ${slot} on ${day} in room ${otherClass.room}`
                    );
                }
            }
        }
    }
};

// Add a new classroom
const addNewClassroom = async ({ room, schedule }) => {
    const existingClassroom = await ClassroomsModel.findOne({ room });
    if (existingClassroom) return existingClassroom;

    await checkForClashes(schedule);

    const newClassroom = new ClassroomsModel({ room, schedule });
    await newClassroom.save();

    const teacherIds = new Set();
    weekdays.forEach((day) => {
        const daySchedule = schedule[day] || {};
        Object.values(daySchedule).forEach((lecture) => {
            if (lecture?.teacher) teacherIds.add(lecture.teacher.toString());
        });
    });

    for (const teacherId of teacherIds) {
        await TeacherModel.findByIdAndUpdate(teacherId, {
            $addToSet: { classes: newClassroom._id },
        });
    }

    return newClassroom;
};

// Get all classrooms
const getAllClassrooms = async () => {
    return await ClassroomsModel.find({});
};

// Get classroom by room name
const getClassroom = async (room) => {
    return await ClassroomsModel.findOne({ room });
};

// Get classroom by MongoDB _id
const getClassroomScheduleById = async (_id) => {
    return await ClassroomsModel.findById(_id);
};

// Export all
export {
    addNewClassroom,
    getAllClassrooms,
    getClassroom,
    getClassroomScheduleById,
};
