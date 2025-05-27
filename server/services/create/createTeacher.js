import Teacher from "../../constructors/teacherConstructor.js";
import TeacherModel from "../../models/Teachers.js";
import addBacklink from "../utils/addBacklink/index.js";
import codeToID from "../utils/codesToID/index.js";
export default async function createTeacher(teacher) {
    const { name, code, subjects = [], classes = [] } = { ...teacher };

    const existingTeacher = await TeacherModel.findOne({ code });
    if (existingTeacher) {
        throw new Error(`Teacher with code: ${code} already exists`);
    }

    const validatedTeacher = new Teacher(name, code, classes, subjects);

    // Convert subject codes to IDs
    const subjectIds = await codeToID("Subject", validatedTeacher.subjects);

    // Convert classroom names to IDs
    const classIds = await codeToID("Classroom", validatedTeacher.classes);

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
