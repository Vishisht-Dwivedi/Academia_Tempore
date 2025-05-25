import Slot from "../../constructors/slotConstructor.js";
import SubjectModel from "../../models/Subjects.js";
import TeacherModel from "../../models/Teachers.js";
//expects an object with slotNumber, subjectObj with a code and type, teacherCode
export default async function createSlot(slotObj) {
    const { slot, subject, teacher } = slotObj;
    const validatedSlot = new Slot(slot, subject, teacher);
    const subjectDoc = await SubjectModel.findOne(validatedSlot.subject);
    if (!subjectDoc) {
        throw new Error(`No subject with code: ${validatedSlot.subject.code} and type ${validatedSlot.subject.type} exists`);
    }
    const teacherDoc = await TeacherModel.findOne({ code: validatedSlot.teacher });
    if (!teacherDoc) {
        throw new Error(`No teacher with code: ${validatedSlot.teacher} exists`);
    }
    //replace with IDs
    const slotToSave = {
        slot: validatedSlot.slot,
        subject: subjectDoc._id,
        teacher: teacherDoc._id
    }

    // ensure backlink: teacher -> subject
    const teacherHasSubject = teacherDoc.subjects.some(
        (sub) => sub.equals(subjectDoc._id) //this because mongo id is weird and subjects store IDs IMPORTANT
    );
    if (!teacherHasSubject) {
        await TeacherModel.updateOne(
            { _id: teacherDoc._id },
            { $addToSet: { subjects: subjectDoc._id } }
        );
    }

    // ensure backlink: subject -> teacher
    const subjectHasTeacher = subjectDoc.teachers.some(
        (tchr) => tchr.equals(teacherDoc._id) //teachers is an array of IDs.. IMPORTANT
    );
    if (!subjectHasTeacher) {
        await SubjectModel.updateOne(
            { _id: subjectDoc._id },
            { $addToSet: { teachers: teacherDoc._id } }
        );
    }

    return slotToSave;
}