import SubjectModel from "../../../models/Subjects.js";
import ClassroomModel from "../../../models/Classrooms.js";
import TeacherModel from "../../../models/Teachers.js";
import { normalizeString } from "../../../constructors/utils/normalizeString.js";
/**
 * Removes all references of a subject from associated teachers and classrooms.
 *
 * This function iterates through all teachers linked to the subject,
 * removes the subject from each teacher's `subjects` list, and also
 * removes related slot entries from the schedules of all classrooms
 * taught by these teachers. Finally, it clears the `classes` field
 * in the subject document.
 *
 * @async
 * @function removeAll
 * @param {Object} subject - The subject document to clean up references for.
 * @param {string} subject._id - The ID of the subject.
 * @param {string[]} [subject.teachers=[]] - Array of teacher IDs associated with the subject.
 * @returns {Promise<Object>} - An object indicating success or failure:
 *  - `{ success: true }` if all references were removed successfully.
 *  - `{ success: false, error }` if an error occurred during the operation.
 */
async function removeAll(subject) {
    const { _id: subjectId, teachers = [] } = subject;
    try {
        // go through all classroom of teachers and remove all slots with that subject
        for (const teacher of teachers) {
            const teacherDoc = await TeacherModel.findOne({ _id: teacher }, { classes: true });
            await ClassroomModel.updateMany(
                { _id: { $in: teacherDoc.classes } },
                {
                    $pull: { "schedule.$[].slots": { subject: subjectId } }
                }
            )
            // remove the subject from that teacher's document
            await TeacherModel.updateOne(
                { _id: teacher },
                { $pull: { subjects: subjectId } }
            )
        }
        await SubjectModel.updateOne({ _id: subjectId }, { teachers: [] });
        return { success: true };
    } catch (error) {
        console.error("Error removing subject references:", error);
        return { success: false, error };
    }
}
/**
 * Removes all references of a specific teacher from a subject and
 * related classroom schedules.
 *
 * @async
 * @function removeTeacher
 * @param {Object} subject - The subject document.
 * @param {string} subject._id - The ID of the subject.
 * @param {string} teacherID - The ID of the teacher to remove.
 * @returns {Promise<Object>} - `{ success: true }` on success, or `{ success: false, error }` on failure.
 */
async function removeTeacher(subject, teacherID) {
    const { _id: subjectId } = subject;
    try {
        const teacherDoc = await TeacherModel.findOne({ _id: teacherID }, { classes: true });
        await ClassroomModel.updateMany(
            { _id: { $in: teacherDoc.classes } },
            {
                $pull: { "schedule.$[].slots": { subject: subjectId } }
            }
        )
        await TeacherModel.updateOne(
            { _id: teacherID },
            { $pull: { subjects: subjectId } }
        );
        await SubjectModel.updateOne(
            { _id: subjectId },
            { $pull: { teachers: teacherID } }
        )
        return { success: true };
    } catch (error) {
        console.error("Error removing subject references:", error);
        return { success: false, error };
    }
}

async function removeClassroom(subject, classID) {
    const { _id: subjectId } = subject;
    try {
        await ClassroomModel.updateOne(
            { _id: classID },
            { $pull: { "schedule.$[].slots": { subject: subjectId } } }
        );
        return { success: true };
    } catch (error) {
        console.error("Error removing subject references:", error);
        return { success: false, error };
    }
}
/**
 * Dispatcher function to remove backlinks for a subject.
 * Can remove all references, or just those related to a specific teacher or classroom.
 *
 * @async
 * @function removeSubjectBacklinks
 * @param {Object} subject - The subject document.
 * @param {Object|null} objectToRemove - Optional descriptor for targeted removal.
 * @param {string} objectToRemove.type - Either 'teacher' or 'classroom'.
 * @param {string} objectToRemove.targetID - ID of the teacher or classroom to unlink.
 * @returns {Promise<Object>} - `{ success: true }` on success, or `{ success: false, error }` on failure.
 */
export default async function removeSubjectBacklinks(subject, objectToRemove = null) {
    try {
        if (!objectToRemove) {
            return await removeAll(subject);
        }

        const { type, targetID } = objectToRemove;
        const normalizedType = normalizeString(type);

        if (normalizedType === "teacher") {
            return await removeTeacher(subject, targetID);
        } else if (normalizedType === "classroom") {
            return await removeClassroom(subject, targetID);
        } else {
            throw new Error(`Unsupported removal type: ${type}`);
        }
    } catch (error) {
        console.error("Error in removeSubjectBacklinks:", error);
        return { success: false, error };
    }
}
