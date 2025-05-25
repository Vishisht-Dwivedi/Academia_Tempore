const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SlotSchema = new Schema({
    slot: {
        type: Number,
        required: true
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
        required: true
    }
}, { _id: false });

const DayScheduleSchema = new Schema({
    day: {
        type: String,
        enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
        required: true
    },
    slots: {
        type: [SlotSchema],
        default: []
    }
}, { _id: false });

export default DayScheduleSchema;
