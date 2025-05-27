import Teacher from "../../constructors/teacherConstructor.js";
import TeacherModel from "../../models/Teachers.js";
import SubjectModel from "../../models/Subjects.js";
import ClassroomModel from "../../models/Classrooms.js";
import addBacklink from "../utils/addBacklink/index.js";
export default async function createTeacher(teacher) {
    const { name, code, subjects = [], classes = [] } = { ...teacher };

    const existingTeacher = await TeacherModel.findOne({ code });
    if (existingTeacher) {
        throw new Error(`Teacher with code: ${code} already exists`);
    }

    const validatedTeacher = new Teacher(name, code, classes, subjects);

    // Convert subject codes to IDs
    const subjectIds = await Promise.all(
        validatedTeacher.subjects.map(async (subCode) => {
            const subjectDoc = await SubjectModel.findOne({ code: subCode });
            if (!subjectDoc) {
                throw new Error(`Subject with code '${subCode}' not found`);
            }
            return subjectDoc._id;
        })
    );

    // Convert classroom names to IDs
    const classIds = await Promise.all(
        validatedTeacher.classes.map(async (roomName) => {
            const roomDoc = await ClassroomModel.findOne({ room: roomName });
            if (!roomDoc) {
                throw new Error(`Classroom with room '${roomName}' not found`);
            }
            return roomDoc._id;
        })
    );

    const teacherToSave = {
        name: validatedTeacher.name,
        code: validatedTeacher.code,
        subjects: subjectIds,
        classes: classIds,
    };

    const savedTeacher = await new TeacherModel(teacherToSave).save();
    await addBacklink("Teacher", savedTeacher);

    return savedTeacher;
}
