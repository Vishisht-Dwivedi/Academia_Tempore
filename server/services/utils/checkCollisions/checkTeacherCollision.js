import TeacherModel from "../../../models/Teachers.js";

export async function checkTeacherCollision(teacherCode, scheduleMap, teacherId, room) {
    const teacherDoc = await TeacherModel.findOne({ code: teacherCode }).populate("classes");

    for (const classroom of teacherDoc.classes) {
        if (classroom.room === room) continue;

        for (const day of classroom.schedule) {
            for (const slot of day.slots) {
                if (slot.teacher.toString() === teacherId.toString()) {
                    if (scheduleMap[day.day].has(slot.slot)) {
                        throw new Error(`Collision: ${teacherDoc.name} has a clash on ${day.day} at slot ${slot.slot} in rooms ${room} and ${classroom.room}`);
                    }
                    scheduleMap[day.day].add(slot.slot);
                }
            }
        }
    }
}
