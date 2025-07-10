import { findClassroom } from "../../classroom/read.js";
import { findSubject } from "../../subject/read.js";
import { findTeacher } from "../../teacher/read.js";

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

/**
 * Returns a fully populated and serialized schedule for a classroom
 * @param {string} classroomID - ObjectId of the classroom
 * @returns {Object} - Serialized schedule with subject + teacher details
 */
export default async function getClassroomSchedule(classroomID) {
    const classroomDoc = await findClassroom({ _id: classroomID });
    if (!classroomDoc || !classroomDoc.schedule) {
        return serializeSchedule(new Schedule()); // Empty fallback
    }

    const schedule = new Schedule();

    try {
        for (const day of classroomDoc.schedule) {
            for (const slot of day.slots || []) {
                const [subjectDoc, teacherDoc] = await Promise.all([
                    findSubject({ _id: slot.subject }),
                    findTeacher({ _id: slot.teacher })
                ]);

                schedule[day.day].set(slot.slot, {
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
                });
            }
        }

        return serializeSchedule(schedule);
    } catch (err) {
        throw new Error(`Error while populating classroom schedule: ${err.message}`);
    }
}
