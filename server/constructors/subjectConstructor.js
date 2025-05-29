import { capitalizeName } from "./utils/capitalizeString.js";
import { normalizeString } from "./utils/normalizeString.js";

const validTypes = ["theory", "lab"];

/**
 * Represents a subject with its metadata and associated teachers.
 *
 * @class
 */
export default class Subject {
    /**
     * Creates a new Subject instance.
     *
     * @constructor
     * @param {string} name - The name of the subject. Will be capitalized.
     * @param {string} code - The unique code for the subject. Will be normalized.
     * @param {string} type - The type of the subject, either "theory" or "lab". Will be normalized.
     * @param {string[]} [teachers=[]] - An optional array of teacher codes. Will be normalized.
     *
     * @throws {Error} If name, code, or type is missing.
     * @throws {Error} If the provided type is not one of the valid types ("theory", "lab").
     * @throws {Error} If teachers is not an array.
     */
    constructor(name, code, type, teachers = []) {
        if (!code || !name || !type) {
            throw new Error("Subject must have a code, name and type");
        }

        const normalizedType = normalizeString(type);
        if (!validTypes.includes(normalizedType)) {
            throw new Error(`Type '${type}' must be one of: theory, lab`);
        }

        /**
         * @type {string}
         * @description Normalized code uniquely identifying the subject.
         */
        this.code = normalizeString(code);

        /**
         * @type {string}
         * @description Capitalized name of the subject.
         */
        this.name = capitalizeName(name);

        /**
         * @type {string}
         * @description Normalized type of the subject. Either "theory" or "lab".
         */
        this.type = normalizedType;

        if (!Array.isArray(teachers)) {
            throw new Error("Teachers must be an array");
        }

        /**
         * @type {string[]}
         * @description Normalized array of teacher codes associated with the subject.
         */
        this.teachers = teachers.map(t => normalizeString(t));
    }
}
