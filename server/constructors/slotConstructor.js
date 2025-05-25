export default class Slot {
    constructor(slot, subjectCode, teacherCode) {
        if (!slot || !subjectCode || !teacherCode) {
            throw new Error("Slot must have a slot number, subjectCode and teacherCode");
        }

        if (typeof slot !== "number" || slot < 1 || slot > 8) {
            throw new Error(`Slot ${slot} must be a number within 1-8`);
        }

        if (typeof subjectCode !== "string" || typeof teacherCode !== "string") {
            throw new Error("subjectCode and teacherCode must be strings");
        }

        this.slot = slot;
        this.subject = subjectCode.toLowerCase().trim();
        this.teacher = teacherCode.toLowerCase().trim();
    }
}
