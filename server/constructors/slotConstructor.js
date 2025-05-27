import Subject from "./subjectConstructor.js";
import { normalizeString } from "./utils/normalizeString.js";
//expects a subject Object with code and type
export default class Slot {
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

        this.slot = slot;
        this.teacher = normalizeString(teacherCode);
        this.subject = new Subject(name, code, type);
    }
}
