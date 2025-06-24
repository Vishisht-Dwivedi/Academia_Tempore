import TeacherModel from "../../../models/Teachers.js";
import SubjectModel from "../../../models/Subjects.js";

/**
 * Adds backlinks between teacher, subject, and classroom.
 * - Adds subject and classroom to teacher
 * - Adds teacher to subject
 *
 * @param {ObjectId} teacherId - The ID of the teacher
 * @param {ObjectId} subjectId - The ID of the subject
 * @param {ObjectId} roomId - The ID of the classroom
 */
export default async function addBacklink(teacherId, subjectId, roomId) {
    try {
        await Promise.all([
            TeacherModel.updateOne(
                { _id: teacherId },
                { $addToSet: { subjects: subjectId, classes: roomId } }
            ),
            SubjectModel.updateOne(
                { _id: subjectId },
                { $addToSet: { teachers: teacherId } }
            )
        ]);
    } catch (err) {
        console.error(`Failed to add backlink - T: ${teacherId}, S: ${subjectId}, R: ${roomId}`);
        throw err;
    }
}
