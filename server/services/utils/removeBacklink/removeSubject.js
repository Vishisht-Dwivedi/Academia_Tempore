import SubjectModel from "../../../models/Subjects.js";
import ClassroomModel from "../../../models/Classrooms.js";
import TeacherModel from "../../../models/Teachers.js";
import { normalizeString } from "../../../constructors/utils/normalizeString.js";

async function removeAll(subject) {
    const { _id: subjectId, teachers = [] } = subject;
    try {

        return { success: true };
    } catch (error) {
        console.error("Error removing teacher references:", error);
        return { success: false, error };
    }
}

async function removeSubject(teacher, subjectID) {
    const { _id: teacherId, classes = [] } = teacher;
    try {
        return { success: true };
    } catch (error) {
        console.error("Error removing teacher references:", error);
        return { success: false, error };
    }
}

async function removeClassroom(teacher, classID) {
    const { _id: teacherId } = teacher;
    try {

        return { success: true };
    } catch (error) {
        console.error("Error removing teacher references:", error);
        return { success: false, error };
    }
}

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
