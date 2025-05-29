import Subject from "./subjectConstructor.js";
import { normalizeString } from "./utils/normalizeString.js";

/**
 * Represents a scheduled time slot with an associated subject and teacher.
 *
 * @class
 */
export default class Slot {
    /**
     * Creates a Slot instance.
     *
     * @constructor
     * @param {number} slot - The slot number (must be between 1 and 8).
     * @param {Object} subject - The subject object associated with this slot. Must contain `name`, `code`, and `type`.
     * @param {string} teacherCode - The code of the teacher assigned to this slot.
     *
     * @throws {Error} If any required field is missing or invalid.
     * @throws {Error} If `slot` is not a number between 1 and 8.
     * @throws {Error} If `subject.code`, `subject.type`, or `teacherCode` are not strings.
     */
    constructor(slot, subject, teacherCode) {
        const { name, code, type } = subject;

        if (!slot || typeof subject !== "object" || !code || !type || !teacherCode) {
            throw new Error(`Slot must have a slot number: ${slot}, subjectCode: ${code}, subjectType: ${type} and teacherCode: ${teacherCode} at subject: ${subject}`);
        }

        if (typeof slot !== "number" || slot < 1 || slot > 8) {
            throw new Error(`Slot ${slot} must be a number within 1-8`);
        }

        if (typeof code !== "string" || typeof teacherCode !== "string" || typeof type !== "string") {
            throw new Error(`subjectCode: ${code}, teacherCode: ${teacherCode} and subjectType: ${type} must be strings`);
        }

        /**
         * @type {number}
         * @description A number representing the time slot (1–8).
         */
        this.slot = slot;

        /**
         * @type {string}
         * @description Normalized teacher code assigned to this slot.
         */
        this.teacher = normalizeString(teacherCode);

        /**
         * @type {Subject}
         * @description A Subject instance constructed from the given subject object.
         */
        this.subject = new Subject(name, code, type);
    }
}
