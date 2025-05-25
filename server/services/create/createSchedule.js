import DayScheduleSchema from "../../models/Schedule.js";
import Schedule from "../../constructors/scheduleConstructor.js";
import Slot from "../../constructors/slotConstructor.js";
import createSlot from "./createSlot.js";
//expects an array of slots and saves them directly and completely
export default async function createSchedule(day, slots) {
    const scheduleSlots = slots.map(slot => new Slot(slot.slot, slot.subject, slot.teacher));
    const validatedSchedule = new Schedule(day, scheduleSlots);
    const slotsToSave = await Promise.all(
        validatedSchedule.slots.map(slot => createSlot(slot))
    )
    const scheduleToSave = {
        day: validatedSchedule.day,
        slots: slotsToSave
    }
    return scheduleToSave;
}