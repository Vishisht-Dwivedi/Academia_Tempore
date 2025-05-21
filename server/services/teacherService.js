import TeacherModel from "../models/Teachers.js";
import { getClassroomScheduleById } from "./classroomService.js";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const addNewTeacher = async ({ code, name }) => {
    const existingTeacher = await TeacherModel.findOne({ code });
    if (existingTeacher) return existingTeacher;

    const newTeacher = new TeacherModel({ code, name });
    await newTeacher.save();
    return newTeacher;
};

const getTeacherByCode = async (code) => {
    return await TeacherModel.findOne({ code });
};

const getTeacherByID = async (_id) => {
    return await TeacherModel.findById(_id);
};

const getAllTeachers = async () => {
    return await TeacherModel.find({});
};

const getTeacherSchedule = async (code) => {
    const teacher = await getTeacherByCode(code);
    if (!teacher) throw new Error("Teacher not found");

    const schedule = {
        Monday: {},
        Tuesday: {},
        Wednesday: {},
        Thursday: {},
        Friday: {},
    };

    for (const classId of teacher.classes) {
        const classSchedule = await getClassroomScheduleById(classId);
        weekdays.forEach((day) => {
            const dailySchedule = classSchedule.schedule[day];
            for (let i = 1; i <= 8; i++) {
                const lecture = dailySchedule[`${i}`];
                if (lecture?.teacher?.toString() === teacher._id.toString()) {
                    schedule[day][i] = {
                        ...lecture.toObject(),
                        room: classSchedule.room,
                    };
                }
            }
        });
    }

    return schedule;
};

export {
    addNewTeacher,
    getTeacherByCode,
    getTeacherByID,
    getAllTeachers,
    getTeacherSchedule,
};
