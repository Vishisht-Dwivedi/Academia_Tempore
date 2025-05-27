export default function parseTeachersFromClassroom(schedule) {
    const teacherIDs = new Map();
    const teacherCodes = new Set();

    for (const day of schedule) {
        for (const slot of day.slots) {
            teacherCodes.add(slot.teacher.code);
            teacherIDs.set(slot.teacher.code, slot.teacher._id);
        }
    }

    return { teacherCodes, teacherIDs };
}
