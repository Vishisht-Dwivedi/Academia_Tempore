import ClassroomModel from "../../../models/Classrooms.js";

/**
 * Inserts a new slot into a classroom's schedule for a specific day.
 * Prevents duplicate slot entries.
 */
export default async function insertNewSlot({ day, slot, teacher, subject, classroom }) {
    // Re-fetch the full document to enable .save()
    const classroomDoc = await ClassroomModel.findById(classroom._id);
    if (!classroomDoc) {
        return;
    }
    const daySchedule = classroomDoc.schedule.find(d => d.day === day);
    if (daySchedule?.slots.find(s => s.slot === slot.slot)) {
        throw new Error(`Slot ${slot.slot} on ${day} already exists for classroom ${classroom.room}`);
    }
    const newSlot = {
        slot: slot.slot,
        teacher: teacher._id,
        subject: subject._id
    };
    if (daySchedule) {
        const alreadyExists = daySchedule.slots.some(s =>
            s.slot === newSlot.slot && s.teacher.toString() === newSlot.teacher.toString()
        );
        if (alreadyExists) {
            throw new Error(`Slot ${newSlot.slot} already exists on ${day} for teacher ${teacher.name}`);
        }
        daySchedule.slots.push(newSlot);
    } else {
        classroomDoc.schedule.push({
            day,
            slots: [newSlot]
        });
    }
    await classroomDoc.save();
}
