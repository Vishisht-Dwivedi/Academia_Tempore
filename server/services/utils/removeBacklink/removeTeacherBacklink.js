import mongoose from "mongoose";
import SubjectModel from "../../../models/Subjects.js";
import ClassroomModel from "../../../models/Classrooms.js";
import TeacherModel from "../../../models/Teachers.js";
import { normalizeString } from "../../../constructors/utils/normalizeString.js";

/**
 * Removes all references of a teacher from subjects and classrooms,
 * and clears the teacher's subject and class lists.
 */
async function removeAll(teacher) {
    const { _id: teacherId, classes = [], subjects = [] } = teacher;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        await SubjectModel.updateMany(
            { _id: { $in: subjects } },
            { $pull: { teachers: teacherId } },
            { session }
        );

        await ClassroomModel.updateMany(
            { _id: { $in: classes } },
            { $pull: { "schedule.$[].slots": { teacher: teacherId } } },
            { session }
        );

        await TeacherModel.updateOne(
            { _id: teacherId },
            { $set: { classes: [], subjects: [] } },
            { session }
        );

        await session.commitTransaction();
        return { success: true };
    } catch (error) {
        await session.abortTransaction();
        console.error("Error removing teacher references:", error);
        return { success: false, error };
    } finally {
        session.endSession();
    }
}

/**
 * Removes a teacher's reference from a specific subject and all related classroom schedules.
 */
async function removeSubject(teacher, subjectID) {
    const { _id: teacherId, classes = [] } = teacher;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        await SubjectModel.updateOne(
            { _id: subjectID },
            { $pull: { teachers: teacherId } },
            { session }
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
            },
            { session }
        );

        await TeacherModel.updateOne(
            { _id: teacherId },
            { $pull: { subjects: subjectID } },
            { session }
        );

        await session.commitTransaction();
        return { success: true };
    } catch (error) {
        await session.abortTransaction();
        console.error("Error removing teacher references:", error);
        return { success: false, error };
    } finally {
        session.endSession();
    }
}

/**
 * Removes a teacher's reference from a specific classroom's schedule.
 */
async function removeClassroom(teacher, classID) {
    const { _id: teacherId } = teacher;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        await ClassroomModel.updateOne(
            { _id: classID },
            {
                $pull: {
                    "schedule.$[].slots": {
                        teacher: teacherId
                    }
                }
            },
            { session }
        );

        await TeacherModel.updateOne(
            { _id: teacherId },
            { $pull: { classes: classID } },
            { session }
        );

        await session.commitTransaction();
        return { success: true };
    } catch (error) {
        await session.abortTransaction();
        console.error("Error removing teacher references:", error);
        return { success: false, error };
    } finally {
        session.endSession();
    }
}

/**
 * Removes a teacher's reference from the system based on the provided object type and target ID.
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
