import TeacherModel from "../../models/Teachers.js";
import bcrypt from "bcrypt";
import ClassroomModel from "../../models/Classrooms.js";
import SubjectModel from "../../models/Subjects.js";
/**
 * Find a teacher by any field
 * @param {Object} filter - Mongoose filter object (e.g. { code }, { _id }, { email })
 * @param {Object} options - Optional: populate, select, lean, includeSchedule
 */
export async function findTeacher(filter) {
    let query = TeacherModel.findOne(filter).populate("classes subjects").lean();
    const teacher = await query;
    if (!teacher) {
        throw new Error(`Teacher not found for filter: ${JSON.stringify(filter)}`);
    }
    return teacher;
}
export async function getAllTeachers() {
    let query = TeacherModel.find({}).populate("classes subjects").lean();
    return await query;
}
export async function authenticateTeacher(email, password) {
    const teacher = await TeacherModel.findOne({ email });
    if (!teacher) return { user: false };

    const verified = await bcrypt.compare(password, teacher.password_hash);
    if (!verified) return { user: false };

    return {
        user: teacher.name,
        email: teacher.email
    };
}
