import TeacherModel from "../../models/Teachers.js";
import ClassroomModel from "../../models/Classrooms.js";
export const getTeacherByCode = async (code) => {
    try {
        const teacher = await TeacherModel.findOne({ code }).populate("classes").lean();
        if (!teacher) {
            throw new Error(`Teacher with code: ${code} not found`);
        }
        return {
            success: true,
            data: teacher
        }
    } catch (error) {
        return {
            success: false,
            error: error.message || "Unknown error",
        };
    }
}