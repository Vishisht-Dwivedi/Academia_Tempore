import { normalizeString } from "../../constructors/utils/normalizeString.js";
import SubjectModel from "../../models/Subjects.js";
const getSubjectByID = async (_id) => {
    const subject = await SubjectModel.findById(_id).lean();
    if (!subject) {
        throw new Error(`No subject with id: ${_id} found`);
    }
    return subject;
}
const getSubjectByCodeAndType = async ({ code, type }) => {
    const validatedCode = normalizeString(code);
    const validatedType = normalizeString(type);
    const subject = await SubjectModel.findOne({ code: validatedCode, type: validatedType }).lean();
    if (!subject) {
        throw new Error(`No subject with code: ${code} and type: ${type} found`);
    }
    return subject;
}

const getAllSubjects = async () => {
    const subjects = await SubjectModel.find({}).lean();
    return subjects;
}
export { getSubjectByID, getSubjectByCodeAndType, getAllSubjects }