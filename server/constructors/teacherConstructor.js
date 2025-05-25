export default class Teacher {
    constructor(name, code, classes = [], subjects = []) {
        if (!name || !code) throw new Error("Teacher must have a name and code");

        this.name = name
            .toLowerCase()
            .replace(/\b\w/g, char => char.toUpperCase());

        this.code = code.toLowerCase().trim();

        if (!Array.isArray(classes) || !Array.isArray(subjects)) {
            throw new Error("Classes and subjects must be arrays");
        }
        this.classes = classes.map(c => typeof c === 'string' ? c.toUpperCase().trim() : c);
        this.subjects = subjects.map(s => typeof s === 'string' ? s.toLowerCase().trim() : s);
    }
}
