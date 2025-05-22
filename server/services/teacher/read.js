import TeacherModel from "../../models/Teachers.js";
import { getClassroomScheduleById } from "../classroom/classroomService.js";

const getTeacherByCode = async (code) => {
    return await TeacherModel.findOne({ code });
};

const getTeacherByID = async (_id) => {
    return await TeacherModel.findById(_id);
};

const getAllTeachers = async () => {
    return await TeacherModel.find({});
};

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
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
export { getTeacherByCode, getTeacherByID, getAllTeachers, getTeacherSchedule }