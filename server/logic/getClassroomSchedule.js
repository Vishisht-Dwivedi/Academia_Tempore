import { getClassroomByID } from "../services/read/readClassroom.js";
import { getSubjectByID } from "../services/read/readSubject.js";
import { getTeacherByID } from "../services/read/readTeacher.js";
const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
class Schedule {
    constructor() {
        for (const day of days) {
            this[day] = new Map();
        }
    }
}
function serializeSchedule(schedule) {
    const result = {};
    for (const day of days) {
        result[day] = Array.from(schedule[day].entries()).map(([slot, value]) => ({
            slot,
            ...value
        }));
    }
    return result;
}
export default async function getClassroomSchedule(classroomID) {
    const classroomDoc = await getClassroomByID(classroomID);
    if (!classroomDoc || classroomDoc.schedule.length === 0) {
        throw new Error("Classroom not found, or its schedule was empty");
    }
    const classroomSchedule = new Schedule();
    try {
        for (const day of classroomDoc.schedule) {
            for (const slot of day.slots) {
                const subjectDoc = await getSubjectByID(slot.subject);
                const teacherDoc = await getTeacherByID(slot.teacher);
                classroomSchedule[day.day].set(slot.slot, {
                    subject: subjectDoc.name,
                    type: subjectDoc.type,
                    room: classroomDoc.room,
                    teacher: teacherDoc.name
                })

            }
        }
        return serializeSchedule(classroomSchedule);
    } catch (error) {
        throw error;
    }
}