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

SubjectSchema.index({ code: 1, type: 1 }, { unique: true }); // only one doc with same code and type

const SubjectModel = mongoose.model("Subject", SubjectSchema);
export default SubjectModel;
