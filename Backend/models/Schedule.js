import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    time: [Number],
    subjectCode: String,
    subjectType: String,
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
        required: true
    }
});
export default ScheduleSchema;