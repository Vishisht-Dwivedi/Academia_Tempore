import { capitalizeName } from "../utils/capitalizeString";
import { normalizeString } from "../utils/normalizeString";

export class Slot {
    constructor(slot, subject, room, type, teacher) {
        if (!slot || !subject || !room || !type || !teacher) {
            throw new Error(`Incomplete slot data slot: ${slot} subject:${subject} room:${room} type:${type} teacher:${teacher}`);
        }

        if (slot < 1 || slot > 8) {
            throw new Error(`slot: ${slot} must be within 1-8`);
        }

        if (!["theory", "lab"].includes(type.trim().toLowerCase())) {
            throw new Error(`type of slot must be either theory or lab, received: ${type}`);
        }

        this.slot = slot;
        this.subject = capitalizeName(subject);
        this.teacher = capitalizeName(teacher);
        this.room = room.toUpperCase().trim();
        this.type = normalizeString(type);
    }
}
