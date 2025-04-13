import mongoose from "mongoose";
import { getClassroomScheduleById } from "./Classrooms.js";
const Schema = mongoose.Schema;
//Schema and models
const TeacherSchema = new Schema({
    name: String,
    code: {
        type: String,
        unique: true
    },
    classes: [{
        type: Schema.Types.ObjectId,
        ref: "Classroom"
    }]
});

const TeacherModel = mongoose.model("Teacher", TeacherSchema);
//Add
const addNewTeacher = async ({ code, name }) => {
    const existingTeacher = await TeacherModel.findOne({ code });
    if (!existingTeacher) {
        const newTeacher = new TeacherModel({ code, name });
        await newTeacher.save();
        return newTeacher;
    } else {
        return existingTeacher;
    }
};
//Get
const getTeacherByCode = async (code) => {
    return await TeacherModel.findOne({ code });
}
const getTeacherByID = async (_id) => {
    return await TeacherModel.findById({ _id });
}
const getAllTeachers = async () => {
    return await TeacherModel.find({});
}
const getTeacherSchedule = async (code) => {
    const Schedule = { "Monday": [], "Tuesday": [], "Wednesday": [], "Thursday": [], "Friday": [] };
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const teacher = await getTeacherByCode(code);

    for (const classId of teacher.classes) {
        const classSchedule = await getClassroomScheduleById(classId);
        weekdays.forEach((day) => {
            const dailySchedule = classSchedule.schedule[day];
            dailySchedule.forEach((lecture) => {
                if (String(lecture.teacher) === String(teacher._id)) {
                    const { time, subjectCode, subjectType } = lecture;
                    const slot = {
                        time,
                        subjectCode,
                        subjectType,
                        room: classSchedule.room
                    }
                    Schedule[day].push(slot);
                };
            });
        });
    }
    return Schedule;
}

export { addNewTeacher, getAllTeachers, getTeacherSchedule, TeacherModel };