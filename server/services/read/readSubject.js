import SubjectModel from "../../models/Subjects.js";
const getSubjectByID = async (_id) => {
    const subject = await SubjectModel.findById(_id)
        .populate("teachers", ["code", "name"])
        .lean();
    if (!subject) {
        throw new Error(`No subject with id: ${_id} found`);
    }
    return subject;
}
const getSubjectByCodeAndType = async ({ code, type }) => {
    const validatedCode = code.trim().toLowerCase();
    const validatedType = type.trim().toLowerCase();
    const subject = await SubjectModel.findOne({ code: validatedCode, type: validatedType })
        .populate("teachers", ["code", "name"])
        .lean();
    if (!subject) {
        throw new Error(`No subject with id: ${_id} found`);
    }
    return subject;
}
export { getSubjectByID, getSubjectByCodeAndType }