import TeacherModel from "../../models/Teachers.js";
import ClassroomModel from "../../models/Classrooms.js";
import SubjectModel from "../../models/Subjects.js";

/**
 * Deletes a teacher and removes all their references in classrooms and subjects.
 * @param {string} teacherCode
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export default async function deleteTeacher(teacherCode) {
    const code = teacherCode.toUpperCase().trim();

    const teacher = await TeacherModel.findOne({ code });
    if (!teacher) {
        throw new Error(`Teacher with code "${teacherCode}" not found.`);
    }

    const teacherId = teacher._id;

    // 1. Remove teacher from classrooms
    const classroomUpdates = await ClassroomModel.updateMany(
        { "schedule.slots.teacher": teacherId },
        {
            $pull: {
                "schedule.$[].slots": { teacher: teacherId }
            }
        }
    );

    // 2. Remove teacher from subjects
    const subjectUpdates = await SubjectModel.updateMany(
        { teachers: teacherId },
        { $pull: { teachers: teacherId } }
    );

    // 3. Delete teacher document
    await TeacherModel.findByIdAndDelete(teacherId);

    return {
        success: true,
        message: `Teacher "${teacher.name}" deleted from DB. Removed from ${classroomUpdates.modifiedCount} classrooms and ${subjectUpdates.modifiedCount} subjects.`,
    };
}
