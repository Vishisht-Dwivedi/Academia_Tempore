import SubjectModel from "../../../models/Subjects.js";
import ClassroomModel from "../../../models/Classrooms.js";
import TeacherModel from "../../../models/Teachers.js";
import { normalizeString } from "../../../constructors/utils/normalizeString.js";

/**
 * Removes all references of a teacher from subjects and classrooms,
 * and clears the teacher's subject and class lists.
 *
 * @async
 * @function removeAll
 * @param {Object} teacher - The teacher document.
 * @param {string} teacher._id - The ID of the teacher.
 * @param {string[]} [teacher.classes=[]] - Array of classroom IDs assigned to the teacher.
 * @param {string[]} [teacher.subjects=[]] - Array of subject IDs assigned to the teacher.
 * @returns {Promise<Object>} - An object with `success: true` if operation succeeded, else `success: false` and the error.
 */
async function removeAll(teacher) {
    const { _id: teacherId, classes = [], subjects = [] } = teacher;
    try {
        await SubjectModel.updateMany(
            { _id: { $in: subjects } },
            { $pull: { teachers: teacherId } }
        );

        await ClassroomModel.updateMany(
            { _id: { $in: classes } },
            { $pull: { "schedule.$[].slots": { teacher: teacherId } } }
        );

        await TeacherModel.updateOne(
            { _id: teacherId },
            { $set: { classes: [], subjects: [] } }
        );

        return { success: true };
    } catch (error) {
        console.error("Error removing teacher references:", error);
        return { success: false, error };
    }
}

/**
 * Removes a teacher's reference from a specific subject and all related classroom schedules.
 *
 * @async
 * @function removeSubject
 * @param {Object} teacher - The teacher document.
 * @param {string} teacher._id - The ID of the teacher.
 * @param {string[]} teacher.classes - Array of classroom IDs assigned to the teacher.
 * @param {string} subjectID - The ID of the subject to remove.
 * @returns {Promise<Object>} - An object with `success: true` if operation succeeded, else `success: false` and the error.
 */
async function removeSubject(teacher, subjectID) {
    const { _id: teacherId, classes = [] } = teacher;
    try {
        await SubjectModel.updateOne(
            { _id: subjectID },
            { $pull: { teachers: teacherId } }
        );

        await ClassroomModel.updateMany(
            { _id: { $in: classes } },
            {
                $pull: {
                    "schedule.$[].slots": {
                        teacher: teacherId,
                        subject: subjectID
                    }
                }
            }
        );

        await TeacherModel.updateOne(
            { _id: teacherId },
            { $pull: { subjects: subjectID } }
        );

        return { success: true };
    } catch (error) {
        console.error("Error removing teacher references:", error);
        return { success: false, error };
    }
}

/**
 * Removes a teacher's reference from a specific classroom's schedule.
 *
 * @async
 * @function removeClassroom
 * @param {Object} teacher - The teacher document.
 * @param {string} teacher._id - The ID of the teacher.
 * @param {string} classID - The ID of the classroom to remove.
 * @returns {Promise<Object>} - An object with `success: true` if operation succeeded, else `success: false` and the error.
 */
async function removeClassroom(teacher, classID) {
    const { _id: teacherId } = teacher;
    try {
        await ClassroomModel.updateOne(
            { _id: classID },
            {
                $pull: {
                    "schedule.$[].slots": {
                        teacher: teacherId
                    }
                }
            }
        );

        await TeacherModel.updateOne(
            { _id: teacherId },
            { $pull: { classes: classID } }
        );

        return { success: true };
    } catch (error) {
        console.error("Error removing teacher references:", error);
        return { success: false, error };
    }
}

/**
 * Removes a teacher's reference from the system based on the provided object type and target ID.
 *
 * @async
 * @function removeTeacherBacklinks
 * @param {Object} teacher - The teacher document to clean up references for.
 * @param {Object|null} [objectToRemove=null] - Optional object containing the type and ID of the reference to remove.
 * @param {string} objectToRemove.type - The type of object ("subject" or "classroom").
 * @param {string} objectToRemove.targetID - The ID of the specific subject or classroom.
 * @returns {Promise<Object>} - An object with `success: true` if the operation succeeded, else `success: false` and the error.
 */
export default async function removeTeacherBacklinks(teacher, objectToRemove = null) {
    try {
        if (!objectToRemove) {
            return await removeAll(teacher);
        }

        const { type, targetID } = objectToRemove;
        const normalizedType = normalizeString(type);

        if (normalizedType === "subject") {
            return await removeSubject(teacher, targetID);
        } else if (normalizedType === "classroom") {
            return await removeClassroom(teacher, targetID);
        } else {
            throw new Error(`Unsupported removal type: ${type}`);
        }
    } catch (error) {
        console.error("Error in removeTeacherBacklinks:", error);
        return { success: false, error };
    }
}
