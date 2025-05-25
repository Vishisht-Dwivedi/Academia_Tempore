const validTypes = ["theory", "lab"];

export default class Subject {
    constructor(name, code, type, teachers = []) {
        if (!code || !name || !type) {
            throw new Error("Subject must have a code, name and type");
        }
        const normalizedType = type.toLowerCase().trim();
        if (!validTypes.includes(normalizedType)) {
            throw new Error(`Type '${type}' must be one of: Theory, Lecture`);
        }

        this.code = code.toLowerCase().trim();
        this.name = name.toLowerCase().trim();
        this.type = normalizedType;

        if (!Array.isArray(teachers)) {
            throw new Error("Teachers must be an array");
        }
        this.teachers = teachers.map(t => t.toLowerCase().trim());
    }
}
