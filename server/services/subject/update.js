import SubjectModel from "../../models/Subjects.js";
import { subjectSchema } from "../../../lib/validations/subject.js";

/**
 * Updates an existing subject's details.
 * 
 * @param {Object<string>} subject - Must contain `code`, `type`, and updated fields.
 * @returns {Promise<Object>} A result object with success, updated data or error.
 */
export async function updateSubject(subject) {
    try {
        const parsed = subjectSchema.safeParse(subject);
        if (!parsed.success) {
            throw new Error(`Validation failed: ${parsed.error.message}`);
        }

        const validated = parsed.data;

        // Find the subject first
        const existing = await SubjectModel.findOne({ code: validated.code, type: validated.type });
        if (!existing) {
            throw new Error(`Subject with code "${validated.code}" and type "${validated.type}" not found`);
        }

        existing.name = validated.name;

        // Only update teachers if explicitly provided
        if ("teachers" in subject) {
            existing.teachers = validated.teachers || [];
        }

        const saved = await existing.save();

        return {
            success: true,
            data: saved.toObject(),
        };
    } catch (error) {
        return {
            success: false,
            error: error.message || "Unknown error",
        };
    }
}
