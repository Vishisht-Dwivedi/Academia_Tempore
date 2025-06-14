import Subject from "./subjectConstructor.js";
import Teacher from "./teacherConstructor.js";

/**
 * Represents a single time slot in a classroom schedule, with an associated subject and teacher.
 *
 * @class
 */
export default class Slot {
    /**
     * Creates a new Slot instance.
     *
     * @constructor
     * @param {number} slot - The slot number (from 1 to 8) representing a time period in the day.
     * @param {[string, string, string]} subject - An array representing a subject: [name, code, type].
     * @param {[string, string]} teacher - An array representing a teacher: [name, code].
     *
     * @throws {Error} If the slot is not a number between 1 and 8.
     * @throws {Error} If the subject or teacher constructors throw due to invalid input.
     */
    constructor(slot, subject, teacher) {
        if (typeof slot !== "number" || slot < 1 || slot > 8) {
            throw new Error(`Slot ${slot} must be a number within 1-8`);
        }

        /**
         * @type {number}
         * @description A number representing the time slot (1–8).
         */
        this.slot = slot;

        /**
         * @type {Subject}
         * @description A Subject instance constructed from the given subject tuple [name, code, type].
         */
        this.subject = new Subject(subject);

        /**
         * @type {Teacher}
         * @description A Teacher instance constructed from the given teacher tuple [name, code].
         */
        this.teacher = new Teacher(teacher);
    }
}
