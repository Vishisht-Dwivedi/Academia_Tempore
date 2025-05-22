import TeacherModel from "../../models/Teachers.js";
const addNewTeacher = async ({ code, name }) => {
    const existingTeacher = await TeacherModel.findOne({ code, name });
    if (existingTeacher) {
        throw Error("Teacher already exists");
    };

    const newTeacher = new TeacherModel({ code, name });
    await newTeacher.save();
    return newTeacher;
};
export { addNewTeacher }