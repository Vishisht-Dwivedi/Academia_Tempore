import SubjectModel from "../../models/Subjects.js";
import { subjectSchema } from "../../../lib/validations/subject.js";

/**
 * Creates and saves a new subject to the database after Zod validation.
 *
 * @async
 * @function createSubject
 * @param {Object<string>} subject - Must contain `name`, `code`, and `type`.
 * @returns {Promise<Object>} A result object containing success, data or error.
 */
export default async function createSubject(subject) {
    try {
        const parsed = subjectSchema.safeParse(subject);
        if (!parsed.success) {
            throw new Error(`Validation failed: ${parsed.error.message}`);
        }

        const validatedSubject = parsed.data;

        const existingSubject = await SubjectModel.findOne({
            code: validatedSubject.code,
            type: validatedSubject.type
        });

        if (existingSubject) {
            throw new Error(`Subject with code: ${validatedSubject.code} and type: ${validatedSubject.type} already exists`);
        }

        const savedSubject = await new SubjectModel(validatedSubject).save();

        return {
            success: true,
            data: savedSubject.toObject(),
        };
    } catch (error) {
        return {
            success: false,
            error: error.message || "Unknown error",
        };
    }
}
