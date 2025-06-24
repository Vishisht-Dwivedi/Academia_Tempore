import TeacherModel from "../../../models/Teachers.js";
import ClassroomModel from "../../../models/Classrooms.js";

export default async function isTeacherFree(teacherId, InputDay, InputSlot) {
    const teacherDoc = await TeacherModel.findById(teacherId).lean();
    if (!teacherDoc || teacherDoc.classes.length === 0) {
        return { free: true };
    }

    for (const room of teacherDoc.classes) {
        const roomDoc = await ClassroomModel.findById(room).lean();
        if (!roomDoc || roomDoc.schedule.length === 0) continue;

        for (const day of roomDoc.schedule) {
            if (day.day !== InputDay || day.slots.length === 0) continue;

            for (const slot of day.slots) {
                if (
                    slot.slot === InputSlot &&
                    slot.teacher.toString() === teacherId.toString()
                ) {
                    return {
                        free: false,
                        conflict: {
                            teacherId,
                            room: roomDoc.room,
                            day: InputDay,
                            slot: InputSlot,
                            subjectId: slot.subject.toString()
                        }
                    };
                }
            }
        }
    }

    return { free: true };
}
