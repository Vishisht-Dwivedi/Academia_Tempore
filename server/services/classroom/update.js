import ClassroomsModel from "../../models/Classrooms.js";
import TeacherModel from "../../models/Teachers.js";
import { checkForClashes } from "./clashChecker.js";
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const updateClassroom = async (room, newSchedule) => {
    const classroom = await ClassroomsModel.findOne({ room });
    if (!classroom) {
        throw new Error(`Classroom with room '${room}' not found`);
    }

    await checkForClashes(newSchedule);

    const oldTeacherIds = new Set();
    weekdays.forEach((day) => {
        const daySchedule = classroom.schedule[day] || {};
        Object.values(daySchedule).forEach((lecture) => {
            if (lecture?.teacher) oldTeacherIds.add(lecture.teacher.toString());
        });
    });

    const newTeacherIds = new Set();
    weekdays.forEach((day) => {
        const daySchedule = newSchedule[day] || {};
        Object.values(daySchedule).forEach((lecture) => {
            if (lecture?.teacher) newTeacherIds.add(lecture.teacher.toString());
        });
    });

    classroom.schedule = newSchedule;
    await classroom.save();

    for (const oldId of oldTeacherIds) {
        if (!newTeacherIds.has(oldId)) {
            await TeacherModel.findByIdAndUpdate(oldId, {
                $pull: { classes: classroom._id },
            });
        }
    }

    for (const newId of newTeacherIds) {
        await TeacherModel.findByIdAndUpdate(newId, {
            $addToSet: { classes: classroom._id },
        });
    }

    return classroom;
};
export { updateClassroom }