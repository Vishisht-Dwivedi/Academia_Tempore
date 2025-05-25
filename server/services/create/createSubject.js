import SubjectModel from "../../models/Subjects.js";
import TeacherModel from "../../models/Teachers.js";
import Subject from "../../constructors/subjectConstructor.js";

// expects an object with name, code, type; teachers is optional and will not be strictly enforced
export default async function createSubject(subject) {
    const { name, code, type, teachers = [] } = subject;

    const existingSubject = await SubjectModel.findOne({ code });
    if (existingSubject) {
        throw new Error(`Subject ${name} with code ${code} already exists`);
    }

    const validatedSubject = new Subject(code, name, type, teachers);

    // convert code to IDs
    const teacherIDs = (
        await Promise.all(
            validatedSubject.teachers.map(async (teacherCode) => {
                const teacherDoc = await TeacherModel.findOne({ code: teacherCode });
                return teacherDoc ? teacherDoc._id : null;
            })
        )
    ).filter(Boolean); // remove nulls

    const subjectToSave = {
        name: validatedSubject.name,
        code: validatedSubject.code,
        type: validatedSubject.type,
        teachers: teacherIDs,
    };

    const savedSubject = await new SubjectModel(subjectToSave).save();

    // backlink to teacher
    await TeacherModel.updateMany(
        { _id: { $in: teacherIDs } },
        { $addToSet: { subjects: savedSubject._id } }
    );

    return savedSubject;
}
