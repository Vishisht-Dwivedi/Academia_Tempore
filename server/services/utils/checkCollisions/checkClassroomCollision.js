import { initializeTeacherSchedules, Schedule } from "./initializeTeacherSchedules.js";
import { populateClassroomSchedule } from "./populateClassroomSchedule.js";
import { checkTeacherCollision } from "./checkTeacherCollision.js";
import parseTeachersFromClassroom from "./parseTeachersFromClassroom.js";
export default async function checkClassroomCollision(classroom) {
    const { room, schedule } = classroom;
    const { teacherCodes, teacherIDs } = parseTeachersFromClassroom(schedule);
    const teacherSchedules = initializeTeacherSchedules(teacherCodes);

    populateClassroomSchedule(schedule, teacherSchedules);

    for (const code of teacherCodes) {
        await checkTeacherCollision(
            code,
            teacherSchedules.get(code),
            teacherIDs.get(code),
            room
        );
    }
}
