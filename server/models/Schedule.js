import mongoose from "mongoose";
const Schema = mongoose.Schema;
const SlotSchema = new Schema({
    subjectCode: { type: String, required: true },
    subjectType: { type: String, enum: ["Theory", "Lab"], required: true },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
        required: true
    }
}, { _id: false });

const ScheduleSchema = new Schema({
    1: { type: SlotSchema, default: null },
    2: { type: SlotSchema, default: null },
    3: { type: SlotSchema, default: null },
    4: { type: SlotSchema, default: null },
    5: { type: SlotSchema, default: null },
    6: { type: SlotSchema, default: null },
    7: { type: SlotSchema, default: null },
    8: { type: SlotSchema, default: null }
}, { _id: false });

export default ScheduleSchema;