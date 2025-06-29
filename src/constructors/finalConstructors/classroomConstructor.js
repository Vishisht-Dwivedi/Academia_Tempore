import Schedule from "./scheduleConstructor.js";

/**
 * Represents a classroom with a weekly schedule.
 *
 * @class
 */
export default class Classrooms {
    /**
     * Creates a Classrooms instance.
     *
     * @constructor
     * @param {string} room - The identifier for the classroom (e.g., "TC-204").
     * @param {Array<Object>} daySchedules - An array of objects, each representing a day's schedule with a `day` and an array of `slots`.
     *
     * @throws {Error} If the room is not provided.
     * @throws {Error} If `daySchedules` is not an array.
     */
    constructor(room, daySchedules = []) {
        if (!room) throw new Error("Classroom must have a room identifier");

        if (!Array.isArray(daySchedules)) {
            throw new Error("Schedule must be an array of day schedules");
        }

        /**
         * @type {string}
         * @description The uppercase, trimmed identifier for the classroom.
         */
        this.room = room.trim().toUpperCase();

        /**
         * @type {Schedule[]}
         * @description An array of `Schedule` instances representing each weekday's schedule.
         */
        this.schedule = daySchedules.map((schedule) => new Schedule(schedule.day, schedule.slots));
    }
}
