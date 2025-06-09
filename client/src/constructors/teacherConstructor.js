import Subject from "./subjectConstructor.js";
import { capitalizeName } from "./utils/capitalizeString.js";
import { normalizeString } from "./utils/normalizeString.js";

/**
 * Represents a Teacher with associated classes and subjects.
 * 
 * @class
 */
export default class Teacher {
    /**
     * Creates a new Teacher instance.
     * 
     * @constructor
     * @param {string} name - The full name of the teacher. Will be capitalized.
     * @param {string} code - A unique identifier for the teacher. Will be normalized (lowercased, trimmed, etc.).
     * @param {string[]} [classes=[]] - An array of classroom codes (strings). Will be converted to uppercase and trimmed.
     * @param {Object[]} [subjects=[]] - An array of subject objects. Each object should contain:
     * @param {string} subjects[].name - The name of the subject.
     * @param {string} subjects[].code - The unique code of the subject.
     * @param {string} subjects[].type - The type of the subject (e.g., "theory", "lab").
     * 
     * @throws {Error} If `name` or `code` is not provided.
     * @throws {Error} If `classes` or `subjects` is not an array.
     */
    constructor(name, code, classes = [], subjects = []) {
        if (!name || !code) throw new Error("Teacher must have a name and code");

        /**
         * @type {string}
         * @description Capitalized full name of the teacher.
         */
        this.name = capitalizeName(name);

        /**
         * @type {string}
         * @description Normalized code used to uniquely identify the teacher.
         */
        this.code = normalizeString(code);

        if (!Array.isArray(classes) || !Array.isArray(subjects)) {
            throw new Error("Classes and subjects must be arrays");
        }

        /**
         * @type {string[]}
         * @description Array of normalized classroom codes (uppercase, trimmed).
         */
        this.classes = classes.map(c => typeof c === 'string' ? c.toUpperCase().trim() : c);

        /**
         * @type {Subject[]}
         * @description Array of Subject instances created from provided subject data.
         */
        this.subjects = subjects.map(s => new Subject(s.name, s.code, s.type));
    }
}
