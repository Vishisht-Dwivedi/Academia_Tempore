import TeacherModel from "../../models/Teachers.js";
import getTeacherSchedule from "./utils/getTeacherSchedule.js";
import bcrypt from "bcrypt"
export const getTeacherByCode = async (code) => {
    const teacher = await TeacherModel.findOne({ code }).lean();

    if (!teacher) {
        throw new Error(`Teacher with code: ${code} not found`);
    }
    return teacher;
};

export const getTeacherByID = async (id) => {
    const teacher = await TeacherModel.findById(id)
        .populate("classes")
        .lean();

    if (!teacher) {
        throw new Error(`Teacher with id: ${id} not found`);
    }
    return teacher;
};

export const getAllTeachers = async () => {
    const teachers = await TeacherModel.find({}).lean();
    return teachers;
};
export const getTeacherByName = async (name) => {
    //used for updates returns only name and code
    const teacher = await TeacherModel.findOne({ name }).select({ name: 1, code: 1 }).lean();
    if (!teacher) {
        throw new Error(`Teacher with name : ${name} not found`);
    }
    return teacher;
}

export const getTeacherAuth = async (email, password) => {
    const teacher = await TeacherModel.findOne({ email });
    if (!teacher) return { user: false };
    const verified = await bcrypt.compare(password, teacher.password_hash);
    if (!verified) return { user: false };
    return { user: teacher.name, email: teacher.email }
}
export { getTeacherSchedule };
