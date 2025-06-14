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
     */
    constructor(name, code) {
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
    }
}
