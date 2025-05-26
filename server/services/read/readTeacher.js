import TeacherModel from "../../models/Teachers.js";
const getTeacherByID = async (_id) => {
    const teacher = await TeacherModel.findById(_id)
        .populate("subjects", ["code", "type", "name"])
        .populate("classes", "room")
        .lean();
    if (!teacher) {
        throw new Error(`No Teacher found with id: ${_id}`);
    }
    return teacher;
}
const getTeacherByCode = async (code) => {
    const validatedCode = code.trim().toLowerCase();
    const teacher = await TeacherModel.findOne({ code: validatedCode })
        .populate("subjects", ["code", "type", "name"])
        .populate("classes", "room")
        .lean();
    if (!teacher) {
        throw new Error(`No Teacher found with code: ${code}`);
    }
    return teacher;
}
export { getTeacherByID, getTeacherByCode }