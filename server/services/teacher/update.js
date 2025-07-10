import TeacherModel from "../../models/Teachers.js";
import { teacherSchema } from "../../../lib/validations/teacher.js";

/**
 * Safely updates a teacher document without overwriting fields not passed in.
 * 
 * @param {{ name: string, code: string, email: string, classes?: string[], subjects?: string[] }} teacherInput
 * @returns {Promise<{ success: boolean, data?: object, error?: string }>}
 */
export async function updateTeacher(teacherInput) {
    try {
        const parsed = teacherSchema.partial().safeParse(teacherInput); // allow partial updates

        if (!parsed.success) {
            throw new Error(`Invalid teacher input: ${parsed.error.message}`);
        }

        const validated = parsed.data;

        if (!validated.code) {
            throw new Error("Teacher code is required to perform update.");
        }

        // Build dynamic update payload
        const updatePayload = {};
        if (validated.name) updatePayload.name = validated.name;
        if (validated.email) updatePayload.email = validated.email;
        if (validated.classes) updatePayload.classes = validated.classes;
        if (validated.subjects) updatePayload.subjects = validated.subjects;

        const updatedTeacher = await TeacherModel.findOneAndUpdate(
            { code: validated.code },
            { $set: updatePayload },
            { new: true, lean: true }
        );

        if (!updatedTeacher) {
            throw new Error(`Teacher with code "${validated.code}" not found`);
        }

        return {
            success: true,
            data: updatedTeacher,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message || "Unknown error occurred",
        };
    }
}
