import SubjectModel from "../../models/Subjects.js";

export const getSubjectByID = async (id) => {
    const subject = await SubjectModel.findById(id).lean();
    if (!subject) throw new Error(`Subject with ID ${id} not found`);
    return subject;
};

export const getSubject = async (name, type) => {
    const subject = await SubjectModel.findOne({ name, type });
    if (!subject) throw new Error(`Subject ${name} (${type}) not found`);
    return subject;
}
