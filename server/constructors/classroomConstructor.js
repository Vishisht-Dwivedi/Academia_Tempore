import Schedule from "./scheduleConstructor.js";

export default class Classrooms {
    constructor(room, daySchedules = []) {
        if (!room) throw new Error("Classroom must have a room identifier");

        if (!Array.isArray(daySchedules)) {
            throw new Error("Schedule must be an array of day schedules");
        }

        const schedule = daySchedules.map((schedule) => new Schedule(schedule.day, schedule.slots));

        this.room = room.trim().toUpperCase();
        this.schedule = schedule;
    }
}
