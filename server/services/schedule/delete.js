import { getClassroom } from "../classroom/read.js";

export const removeScheduleSlot = async ({ room, day, slot }) => {
    const classroom = await getClassroom(room);
    const daySchedule = classroom.schedule.find(d => d.day.toLowerCase() === day.toLowerCase());

    if (!daySchedule) {
        throw new Error(`No schedule found for ${day} in ${room}`);
    }

    const originalLength = daySchedule.slots.length;
    daySchedule.slots = daySchedule.slots.filter(s => s.slot !== slot);

    if (daySchedule.slots.length === originalLength) {
        throw new Error(`No matching slot ${slot} found on ${day} in ${room}`);
    }

    await classroom.save();

    return {
        success: true,
        message: `Slot ${slot} removed from ${room} on ${day}`
    };
};
