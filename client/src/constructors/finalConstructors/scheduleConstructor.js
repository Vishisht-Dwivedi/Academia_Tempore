import Slot from "./slotConstructor.js";
import { normalizeString } from "../utils/normalizeString.js";

const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

/**
 * Represents a daily schedule containing multiple class slots.
 *
 * @class
 */
export default class Schedule {
    /**
     * Creates a Schedule instance.
     *
     * @constructor
     * @param {string} day - The day of the week for this schedule (must be a weekday).
     * @param {Array<Object>} slotsArray - Array of slot-like objects. Each must contain `slot`, `subject`, and `teacher` keys.
     *
     * @throws {Error} If the day is missing or invalid.
     * @throws {Error} If `slotsArray` is not an array.
     * @throws {Error} If there are duplicate slot numbers in `slotsArray`.
     */
    constructor(day, slotsArray = []) {
        if (!day) throw new Error("Schedule must have a day");

        const normalizedDay = normalizeString(day);
        if (!days.includes(normalizedDay)) {
            throw new Error(`${day} must be within weekdays`);
        }

        if (!Array.isArray(slotsArray)) {
            throw new Error("slotsArray must be an array");
        }

        let seenSlots = new Set();
        slotsArray.forEach((slot) => {
            if (seenSlots.has(slot.slot)) {
                throw new Error("Two or more classes allotted to the same slot");
            }
            seenSlots.add(slot.slot);
        });

        /**
         * @type {string}
         * @description Normalized weekday name for the schedule.
         */
        this.day = normalizedDay;

        /**
         * @type {Slot[]}
         * @description Array of Slot instances representing the schedule for the day.
         */
        this.slots = slotsArray.map((slot) => new Slot(slot.slot, slot.subject, slot.teacher));
    }
}
