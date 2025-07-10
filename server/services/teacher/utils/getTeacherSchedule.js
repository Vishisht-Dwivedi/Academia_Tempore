import { findClassroom } from "../../classroom/read.js";
import { findSubject } from "../../subject/read.js";
import { findTeacher } from "../read.js";

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
    const teacherDoc = await findTeacher({ _id: teacherID })
    if (!teacherDoc || !teacherDoc.classes || teacherDoc.classes.length === 0) {
        return serializeSchedule(new Schedule()); // return empty schedule structure
    }

    const teacherSchedule = new Schedule();
    try {
        for (const classroom of teacherDoc.classes) {
            const classroomDoc = await findClassroom({ _id: classroom });
            for (const day of classroomDoc.schedule) {
                for (const slot of day.slots) {
                    if (slot.teacher.toString() === teacherID.toString()) {
                        const subjectDoc = await findSubject({ _id: slot.subject });
                        teacherSchedule[day.day].set(slot.slot, {
                            subject: {
                                name: subjectDoc.name,
                                code: subjectDoc.code,
                                type: subjectDoc.type
                            },
                            room: classroomDoc.room,
                            teacher: {
                                name: teacherDoc.name,
                                code: teacherDoc.code,
                                email: teacherDoc.email
                            }
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