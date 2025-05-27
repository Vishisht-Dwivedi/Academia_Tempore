import Slot from "./slotConstructor.js";
import { normalizeString } from "./utils/normalizeString.js";
const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

export default class Schedule {
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
        const slots = slotsArray.map((slot) => new Slot(slot.slot, slot.subject, slot.teacher));

        this.day = normalizedDay;
        this.slots = slots;
    }
}
