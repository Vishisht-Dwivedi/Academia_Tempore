import mongoose from "mongoose";
const Schema = mongoose.Schema;
const SubjectSchema = new Schema({
    code: {
        type: String,
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["theory", "lab"],
        required: true
    },
    teachers: [{
        type: Schema.Types.ObjectId,
        ref: "Teacher"
    }]
});

const SubjectModel = mongoose.model("Subject", SubjectSchema);
export default SubjectModel;