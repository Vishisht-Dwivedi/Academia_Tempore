import { getSubject } from "../../subject/read.js";
import { getTeacherByName } from "../../teacher/read.js";
import { getClassroom } from "../../classroom/read.js";
import isTeacherFree from "../../utils/collisionDetection/isTeacherFree.js";
import isClassroomFree from "../../utils/collisionDetection/isClassroomFree.js";
import updateExistingSlot from "./updateExistingSlot.js";
import addBacklink from "../../utils/backlink/addBacklink.js";
import insertNewSlot from "./insertNewSlot.js";


export const handleScheduleSlotUpdate = async (day, slot) => {
    const teacher = await getTeacherByName(slot.teacher);
    const subject = await getSubject(slot.subject, slot.type.toLowerCase().trim());
    const teacherFree = await isTeacherFree(teacher._id, day, slot.slot);

    if (!teacherFree.free) {
        const { conflict } = teacherFree;

        if (conflict.room === slot.room) {
            await updateExistingSlot({ day, slot, teacher, subject });
            return;
        }

        throw new Error(
            `Conflict: ${teacher.name} already assigned on ${day}, slot ${slot.slot} in ${conflict.room}`
        );
    }

    const classroom = await getClassroom(slot.room);
    const roomFree = await isClassroomFree(classroom._id, day, slot.slot);

    if (!roomFree.free) {
        throw new Error(
            `Classroom ${slot.room} already occupied on ${day}, slot ${slot.slot}`
        );
    }

    await insertNewSlot({ day, slot, teacher, subject, classroom });
    await addBacklink(teacher._id, subject._id, classroom._id);
};
