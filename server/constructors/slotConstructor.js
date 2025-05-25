const subTypes = ["theory", "lab"];
//expects a subject Object with code and type
export default class Slot {
    constructor(slot, subject, teacherCode) {
        if (!slot || typeof subject !== "object" || !subject.code || !subject.type || !teacherCode) {
            throw new Error(`Slot must have a slot number: ${slot}, subjectCode: ${subject?.code}, subjectType: ${subject?.type} and teacherCode: ${teacherCode}`);
        }

        if (typeof slot !== "number" || slot < 1 || slot > 8) {
            throw new Error(`Slot ${slot} must be a number within 1-8`);
        }

        if (typeof subject.code !== "string" || typeof teacherCode !== "string" || typeof subject.type !== "string") {
            throw new Error(`subjectCode: ${subject.code}, teacherCode: ${teacherCode} and subjectType: ${subject.type} must be strings`);
        }

        const normalizedType = subject.type.toLowerCase().trim();
        if (!subTypes.includes(normalizedType)) {
            throw new Error(`Subject Type : ${subject.type} must be either a Theory or a Lab`);
        }

        this.slot = slot;
        this.teacher = teacherCode.toLowerCase().trim();
        this.subject = {
            code: subject.code.toLowerCase().trim(),
            type: normalizedType
        };
    }
}
