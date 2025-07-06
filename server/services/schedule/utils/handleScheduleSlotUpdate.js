import isTeacherFree from "../../utils/collisionDetection/isTeacherFree.js";
import isClassroomFree from "../../utils/collisionDetection/isClassroomFree.js";
import updateExistingSlot from "./updateExistingSlot.js";
import insertNewSlot from "./insertNewSlot.js";
import addBacklink from "../../utils/backlink/addBacklink.js";

import { findTeacher } from "../../teacher/read.js";
import { findSubject } from "../../subject/read.js";
import { findClassroom } from "../../classroom/read.js";
import ClassroomModel from "../../../models/Classrooms.js";

export const handleScheduleSlotUpdate = async (day, slot) => {
    const teacher = await findTeacher({ code: slot.teacher.code });
    const subject = await findSubject({ code: slot.subject.code, type: slot.subject.type });
    const classroom = await findClassroom({ room: slot.room });

    const teacherFree = await isTeacherFree(teacher._id, day, slot.slot);

    if (!teacherFree.free) {
        const { conflict } = teacherFree;

        const classroomDoc = await ClassroomModel.findById(classroom._id);
        const daySchedule = classroomDoc.schedule.find(d => d.day === day);
        const slotExists = daySchedule?.slots.some(s =>
            s.slot === slot.slot && s.teacher.toString() === teacher._id.toString()
        );

        if (conflict.room === slot.room && slotExists) {
            await updateExistingSlot({ day, slot, teacher, subject });
            return;
        }

        throw new Error(
            `Conflict: ${teacher.name} is already assigned on ${day}, slot ${slot.slot} in ${conflict.room}`
        );
    }

    const roomFree = await isClassroomFree(classroom._id, day, slot.slot);

    if (!roomFree.free) {
        throw new Error(
            `Classroom ${slot.room} already occupied on ${day}, slot ${slot.slot}`
        );
    }
    await insertNewSlot({ day, slot, teacher, subject, classroom });
    await addBacklink(teacher._id, subject._id, classroom._id);
};
