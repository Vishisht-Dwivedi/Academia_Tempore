import Subject from "./subjectConstructor.js";
import { capitalizeName } from "./utils/capitalizeString.js";
import { normalizeString } from "./utils/normalizeString.js";
export default class Teacher {
    constructor(name, code, classes = [], subjects = []) {
        if (!name || !code) throw new Error("Teacher must have a name and code");

        this.name = capitalizeName(name);

        this.code = normalizeString(code);

        if (!Array.isArray(classes) || !Array.isArray(subjects)) {
            throw new Error("Classes and subjects must be arrays");
        }
        //expects class code and subject code, type to be passed
        this.classes = classes.map(c => typeof c === 'string' ? c.toUpperCase().trim() : c);
        this.subjects = subjects.map(s => new Subject(s.name, s.code, s.type));
    }
}
