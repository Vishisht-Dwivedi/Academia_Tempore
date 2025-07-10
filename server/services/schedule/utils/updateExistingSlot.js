import addBacklink from "../../utils/backlink/addBacklink.js";
import ClassroomModel from "../../../models/Classrooms.js";
export default async function updateExistingSlot({ day, slot, teacher, subject }) {
    const classroom = await ClassroomModel.findOne({ room: slot.room });
    const daySchedule = classroom.schedule.find(d => d.day === day);

    if (!daySchedule) {
        throw new Error(`Schedule for ${day} not found in classroom ${slot.room}`);
    }

    const existingSlot = daySchedule.slots.find(s =>
        s.slot === slot.slot && s.teacher.toString() === teacher._id.toString()
    );

    if (existingSlot) {
        existingSlot.subject = subject._id;
        await classroom.save();
    }

    await addBacklink(teacher._id, subject._id, classroom._id);
}
