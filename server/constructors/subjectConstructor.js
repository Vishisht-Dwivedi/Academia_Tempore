import { capitalizeName } from "./utils/capitalizeString.js";
import { normalizeString } from "./utils/normalizeString.js";

const validTypes = ["theory", "lab"];

export default class Subject {
    constructor(name, code, type, teachers = []) {
        if (!code || !name || !type) {
            throw new Error("Subject must have a code, name and type");
        }
        const normalizedType = normalizeString(type);
        if (!validTypes.includes(normalizedType)) {
            throw new Error(`Type '${type}' must be one of: theory, lecture`);
        }

        this.code = normalizeString(code);
        this.name = capitalizeName(name);
        this.type = normalizedType;

        if (!Array.isArray(teachers)) {
            throw new Error("Teachers must be an array");
        }
        this.teachers = teachers.map(t => normalizeString(t));
    }
}
