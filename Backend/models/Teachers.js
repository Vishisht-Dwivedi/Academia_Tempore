import mongoose from "mongoose";
const Schema = mongoose.Schema;
//Schema and models
const TeacherSchema = new Schema({
    name: String,
    code: {
        type: String,
        unique: true
    },
    classes: [{
        type: Schema.Types.ObjectId,
        ref: "Classroom"
    }]
});

const TeacherModel = mongoose.model("Teacher", TeacherSchema);
//Add
const addNewTeacher = async ({ code, name }) => {
    const existingTeacher = await TeacherModel.findOne({ code });
    if (!existingTeacher) {
        const newTeacher = new TeacherModel({ code, name });
        await newTeacher.save();
        return newTeacher;
    } else {
        return existingTeacher;
    }
};
//Get
const getTeacherByCode = async (code) => {
    return await TeacherModel.findOne({ code });
}
const getTeacherByID = async (_id) => {
    return await TeacherModel.findById({ _id });
}
const getAllTeachers = async () => {
    return await TeacherModel.find({});
}
export { addNewTeacher, getTeacherByCode, getTeacherByID, getAllTeachers, TeacherModel };