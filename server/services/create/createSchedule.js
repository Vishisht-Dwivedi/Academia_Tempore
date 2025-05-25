import DayScheduleSchema from "../../models/Schedule.js";
import Schedule from "../../constructors/scheduleConstructor.js";
import createSlot from "./createSlot";
//expects an array of slots and saves them directly and completely
export default async function createSchedule(day, slots) {
    const scheduleSlots = await Promise.all(
        slots.map(slot => createSlot(slot))
    );

    const scheduleToSave = new Schedule(day, scheduleSlots);
    const savedSchedule = new DayScheduleSchema(scheduleToSave);
    return savedSchedule;
}