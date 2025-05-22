import ClassroomsModel from "../../models/Classrooms.js";
import TeacherModel from "../../models/Teachers.js";
import { checkForClashes } from "./clashChecker.js";
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
export { addNewClassroom }