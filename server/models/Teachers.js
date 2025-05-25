import mongoose from "mongoose";

const Schema = mongoose.Schema;
const TeacherSchema = new Schema({
    name: String,
    code: {
        type: String,
        unique: true,
        index: true
    },
    classes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Classroom",
        },
    ],
    subjects: [
        {
            type: Schema.Types.ObjectId,
            ref: "Subject",
        },
    ],
});


const TeacherModel = mongoose.model("Teacher", TeacherSchema);
export default TeacherModel;
