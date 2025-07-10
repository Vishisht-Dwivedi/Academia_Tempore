import TeacherModel from "../../../models/Teachers.js";
import { teacherSchema } from "../../../../lib/validations/teacher.js";
import createTeacher from "../../teacher/create.js";

/**
 * Resolves or creates a Teacher document and returns its MongoDB ObjectId.
 */
export default async function teacherToID(teacher) {
    const parsed = teacherSchema.safeParse(teacher);
    if (!parsed.success) {
        throw new Error(`Invalid teacher: ${parsed.error.message}`);
    }

    const data = parsed.data;

    let teacherDoc = await TeacherModel.findOne({ code: data.code });

    if (!teacherDoc) {
        const created = await createTeacher(data);
        if (!created.success) {
            throw new Error(`Failed to create teacher with code: ${data.code}`);
        }
        teacherDoc = created.data;
    }

    return teacherDoc._id;
}
