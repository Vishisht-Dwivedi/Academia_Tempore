import TeacherModel from "../../models/Teachers.js";
const getTeacherByID = async (_id) => {
    const teacher = await TeacherModel.findById(_id).lean();
    if (!teacher) {
        throw new Error(`No Teacher found with id: ${_id}`);
    }
    return teacher;
}
const getTeacherByCode = async (code) => {
    const validatedCode = code.trim().toLowerCase();
    const teacher = await TeacherModel.findOne({ code: validatedCode }).lean();
    if (!teacher) {
        throw new Error(`No Teacher found with code: ${code}`);
    }
    return teacher;
}
const getAllTeachers = async () => {
    const allTeachers = await TeacherModel.find({}).lean();
    return allTeachers;
}
export { getTeacherByID, getTeacherByCode, getAllTeachers }