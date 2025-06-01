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
export default async function getTeacherSchedule(teacherID) {
    const teacherDoc = await getTeacherByID(teacherID);
    if (!teacherDoc || !teacherDoc.classes || teacherDoc.classes.length === 0) {
        throw new Error("Teacher or their classes not found.");
    }
    const teacherSchedule = new Schedule();
    try {
        for (const classroom of teacherDoc.classes) {
            const classroomDoc = await getClassroomByID(classroom);
            for (const day of classroomDoc.schedule) {
                for (const slot of day.slots) {
                    if (slot.teacher.toString() === teacherID.toString()) {
                        const subjectDoc = await getSubjectByID(slot.subject);
                        teacherSchedule[day.day].set(slot.slot, {
                            subject: subjectDoc.name,
                            type: subjectDoc.type,
                            room: classroomDoc.room
                        })
                    }
                }
            }
        }
        return serializeSchedule(teacherSchedule);
    } catch (error) {
        throw error;
    }

}