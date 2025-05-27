import SubjectModel from "../../models/Subjects.js";
import Subject from "../../constructors/subjectConstructor.js";
import addBacklink from "../utils/addBacklink/index.js";
import codeToID from "../utils/codesToID/index.js";
// expects an object with name, code, type, teacherCodes
export default async function createSubject(subject) {
    const { name, code, type, teachers = [] } = subject;

    const existingSubject = await SubjectModel.findOne({ code });
    if (existingSubject) {
        throw new Error(`Subject ${name} with code ${code} already exists`);
    }

    const validatedSubject = new Subject(code, name, type, teachers);

    // convert code to IDs
    const teacherIDs = await codeToID("Teacher", validatedSubject.teachers); // remove nulls

    const subjectToSave = {
        name: validatedSubject.name,
        code: validatedSubject.code,
        type: validatedSubject.type,
        teachers: teacherIDs,
    };

    const savedSubject = await new SubjectModel(subjectToSave).save();
    await addBacklink("Subject", savedSubject);

    return savedSubject;
}
